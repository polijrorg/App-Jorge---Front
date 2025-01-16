import DefaultHeader from '@components/DefaultHeader';
import * as S from './styles';
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ChildInput } from '@components/ChildInput';
import AddChildButton from '@components/AddChildButton';
import ChildrenService from '@services/ChildrenService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useChildContext } from '@hooks/useChild';

const RegisterChildrenScreen = ({ navigation }) => {

    const { setChildList } = useChildContext();
    
    const [name, setName] = useState<string>('');
    const [height, setHeight] = useState<string>(null);
    const [weight, setWeight] = useState<string>(null);
    const [birthDate, setBirthDate] = useState<Date>(null);
    const [gender, setGender] = useState<string>('');
    const [premature, setPremature] = useState<string>('');
    const [error, setError] = useState<string>('');

    const formatDate = (date: Date): string => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };    

    async function handleConfirm() {
        if (name === '') setError('Insira um nome válido!');
        else if (height === null) setError('Insira uma altura válida!')
        else if (weight === null) setError('Insira um peso válido!')
        else if (birthDate === null) setError('Insira uma data de nascimento válida!')
        else if (gender === null) setError('Insira o sexo biológico da criança!')
        else if (premature === null) setError('Indique se a criança nasceu prematura!')
        else {
            const id = await AsyncStorage.getItem('@jorge:userId')
            const token = await AsyncStorage.getItem('@jorge:token')

            const data = {
                userId: id,
                name: name,
                nascimento: formatDate(birthDate),
                gender: gender.toLowerCase(),
                nascimentopre: premature.toLowerCase(),
                altura: height,
                peso: weight,
                cns: '1111111111111111111111',
                planosaude: '1111111111111111111111'
            }

            await ChildrenService.create(
                data,
                token
            );

            const temp = await ChildrenService.readAll();
            setChildList(temp);

            navigation.goBack();
        }
    }

    return (
        <S.Wrapper>
            <DefaultHeader />
            <S.Content >
                <View style={{ gap: 10, flexDirection: 'row', width: '100%' }}>
                    <S.Button onPress={() => navigation.goBack()} >
                        <Ionicons name="arrow-back-outline" size={20} color="white" />
                    </S.Button >
                    <S.Title>Cadastrar Criança</S.Title>
                </View>
                <S.Description>Dados Básicos</S.Description>
                <ChildInput title='Nome' value={name} onChange={(a) => setName(a)} />
                <ChildInput title='Data de nascimento' isDate={true} value={birthDate} onChange={(a) => setBirthDate(a)} />
                <ChildInput title='Sexo biológico' isSelection={true} options={['Feminino', 'Masculino']} value={gender} onChange={(a) => setGender(a)} />

                <S.Description>Marcos Iniciais - Nascimento</S.Description>
                <ChildInput title='Nascimento Prematuro' isSelection={true} options={['Sim', 'Não']} value={premature} onChange={(a) => setPremature(a)} />
                <ChildInput title='Altura (em cm)' value={height} onChange={(a) => setHeight(a)} isNumber={true} />
                <ChildInput title='Peso (em kg)' value={weight} onChange={(a) => setWeight(a)} isNumber={true} unit='kg' />

                {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

                <AddChildButton title='Completar Cadastro' onPress={() => handleConfirm()}/>

            </S.Content>
        </S.Wrapper>
    )

};

export default RegisterChildrenScreen;
