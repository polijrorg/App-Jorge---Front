import * as S from './styles';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ChildInput } from '@components/ChildInput';
import AddChildButton from '@components/AddChildButton';
import ChildrenHeader from '@components/ChildrenHeader';
import ChildCard from '@components/ChildCard';
import ChildrenService from '@services/ChildrenService';
import { useChildContext } from '@hooks/useChild';
import { useAuthContext } from '@hooks/useAuth';

const EditChildrenScreen = ({ navigation }) => {
    const { activeChild: child, setChildList, setActiveChild } = useChildContext();
    const { user } = useAuthContext();

    useEffect(() => {
        setName(child.name);
        setHeight(child.altura);
        setWeight(child.peso);
        setBirthDate(child.nascimento);
        setGender(child.gender === 'masculino' ? 'Masculino' : 'Feminino');
        setPremature(child.nascimentopre === 'sim' ? 'Sim' : 'Não');
        // setHealthPlan(child.planosaude);
        // setCNS(child.cns);       
    }, [child])

    const [name, setName] = useState<string>('');
    const [height, setHeight] = useState<string>('');
    const [weight, setWeight] = useState<string>('');
    const [birthDate, setBirthDate] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [premature, setPremature] = useState<string>(''); 
    // const [healthPlan, setHealthPlan] = useState<string>('');
    // const [CNS, setCNS] = useState<string>('');
    const [error, setError] = useState<string>('');

    async function deleteChild() {
      ChildrenService.delete(child.idchildren);
      const response = await ChildrenService.readByParent(user.id);
      setChildList(response);
      setActiveChild(null);
      navigation.goBack();
    }

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
                nascimento: birthDate,
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

            const response = await ChildrenService.readByParent(user.id);
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
                    birthDate={birthDate ? birthDate : '-'}
                    weight={`${weight}kg` || 'weight'}
                    height={`${height}cm` || 'height'}
                    id={'50'}
                    gender={gender}
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

                <View style={{ gap:8 }}>
                  <AddChildButton title='Alterar Cadastro' onPress={() => handleConfirm()}/>
                  <AddChildButton hidePlus invertColors title='Deletar Criança' onPress={() => deleteChild()}/>
                </View>
            </S.Content>
        </S.Wrapper>
    )

};

export default EditChildrenScreen;
