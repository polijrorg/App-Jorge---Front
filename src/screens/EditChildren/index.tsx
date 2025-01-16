import * as S from './styles';
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ChildInput } from '@components/ChildInput';
import AddChildButton from '@components/AddChildButton';
import ChildrenHeader from '@components/ChildrenHeader';
import ChildCard from '@components/ChildCard';
import Bebe from '@assets/icons/Bebe.png'
import { RouteProp, useRoute } from '@react-navigation/native';
import Child from '@interfaces/Child';
import ChildrenService from '@services/ChildrenService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { template } from '@babel/core';
import { useChildContext } from '@hooks/useChild';

const EditChildrenScreen = ({ navigation }) => {

    const convertToDate = (dateString: string): Date => {
        const [day, month, year] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day);
    };

    const formatDate = (date: Date): string => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const { activeChild: child, setChildList } = useChildContext();

    useEffect(() => {
        setName(child.name);
        setHeight(child.altura);
        setWeight(child.peso);
        setBirthDate(convertToDate(child.nascimento));
        setGender(child.gender === 'masculino' ? 'Masculino' : 'Feminino');
        setPremature(child.nascimentopre === 'sim' ? 'Sim' : 'Não');
        // setHealthPlan(child.planosaude);
        // setCNS(child.cns);       
    }, [child])

    const [name, setName] = useState<string>('');
    const [height, setHeight] = useState<string>('');
    const [weight, setWeight] = useState<string>('');
    const [birthDate, setBirthDate] = useState<Date>(new Date());
    const [gender, setGender] = useState<string>('');
    const [premature, setPremature] = useState<string>(''); 
    // const [healthPlan, setHealthPlan] = useState<string>('');
    // const [CNS, setCNS] = useState<string>('');
    const [error, setError] = useState<string>('');

    async function handleConfirm() {
        if (name === '') setError('Insira um nome válido!');
        else if (height === null) setError('Insira uma altura válida!')
        else if (weight === null) setError('Insira um peso válido!')
        else if (birthDate === null) setError('Insira uma data de nascimento válida!')
        else if (gender === null) setError('Insira o sexo biológico da criança!')
        else if (premature === null) setError('Indique se a criança nasceu prematura!')
        // else if (healthPlan === '') setError('Insira um Plano de Saúde válido!')
        // else if (CNS === '') setError('Insira um CNS válido!')
        else {
            const data = {
                name: name,
                nascimento: formatDate(birthDate),
                gender: gender.toLowerCase(),
                nascimentopre: premature.toLowerCase(),
                altura: height,
                peso: weight,
                // planosaude: healthPlan,
                // cns: CNS
            }

            await ChildrenService.update(
                data,
                child.idchildren
            );

            const response = await ChildrenService.readAll();
            setChildList(response);

            navigation.goBack();
        }
    }

    return (
        <S.Wrapper>
            <ChildrenHeader />
            <S.Content >
                <View style={{ gap: 10, flexDirection: 'row', width: '100%' }}>
                    <S.Button onPress={() => navigation.goBack()} >
                        <Ionicons name="arrow-back-outline" size={20} color="white" />
                    </S.Button >
                    <S.Title>Editar Perfil</S.Title>
                </View>

                <ChildCard
                    isEditable={false}
                    name={name || 'name'}
                    birthDate={birthDate ? formatDate(birthDate) : '-'}
                    weight={`${weight}kg` || 'weight'}
                    height={`${height}cm` || 'height'}
                    id={'50'}
                    vaccinePercentage={80}
                    avatar={Bebe}
                />

                <S.Description>Dados Básicos</S.Description>
                <ChildInput title='Nome' value={name || ''} onChange={(a) => setName(a)} isEditable={true}/>
                <ChildInput title='Data de nascimento' isDate={true} value={birthDate || ''} onChange={(a) => setBirthDate(a)} isEditable={true}/>
                <ChildInput title='Sexo biológico' isSelection={true} options={['Feminino', 'Masculino']} value={gender || ''} onChange={(a) => setGender(a)} isEditable={true}/>

                <S.Description>Marcos Iniciais - Nascimento</S.Description>
                <ChildInput title='Nascimento Prematuro' isSelection={true} options={['Sim', 'Não']} value={premature || ''} onChange={(a) => setPremature(a)} isEditable={true}/>
                <ChildInput title='Altura (em cm)' value={height || ''} onChange={(a) => setHeight(a)} isNumber={true} isEditable={true}/>
                <ChildInput title='Peso (em kg)' value={weight || ''} onChange={(a) => setWeight(a)} isNumber={true} unit='kg' isEditable={true}/>

                {/* <S.Description>Documentos</S.Description>
                <ChildInput title='Plano de Saúde' value={healthPlan || ''} onChange={(a) => setHealthPlan(a)} isNumber={true} isEditable={true}/>
                <ChildInput title='CNS' value={CNS || ''} onChange={(a) => setCNS(a)} isNumber={true} isEditable={true}/> */}

                {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

                <AddChildButton title='Completar Cadastro' onPress={() => handleConfirm()}/>
            </S.Content>
        </S.Wrapper>
    )

};

export default EditChildrenScreen;
