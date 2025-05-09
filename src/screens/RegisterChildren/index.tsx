import DefaultHeader from '@components/DefaultHeader';
import * as S from './styles';
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ChildInput } from '@components/ChildInput';
import AddChildButton from '@components/AddChildButton';
import ChildrenService from '@services/ChildrenService';
import { useChildContext } from '@hooks/useChild';
import { useAuthContext } from '@hooks/useAuth';
import GrowthDataService from '@services/GrowthDataService';

const RegisterChildrenScreen = ({ navigation }) => {

    const { setChildList } = useChildContext();
    const { user } = useAuthContext();
    
    const [name, setName] = useState<string>(null);
    const [height, setHeight] = useState<string>(null);
    const [weight, setWeight] = useState<string>(null);
    const [birthDate, setBirthDate] = useState<string>(null);
    const [gender, setGender] = useState<string>(null);
    const [premature, setPremature] = useState<string>(null);
    const [error, setError] = useState<string>(null); 

    async function handleConfirm() {
        if (!name) setError('Insira um nome válido!');
        else if (!height) setError('Insira uma altura válida!');
        else if (!weight) setError('Insira um peso válido!');
        else if (!birthDate) setError('Insira uma data de nascimento válida!');
        else if (!gender) setError('Insira o sexo biológico da criança!');
        else if (!premature) setError('Indique se a criança nasceu prematura!');
        else {
            const data = {
                userId: user.id,
                name: name,
                nascimento: birthDate,
                gender: gender.toLowerCase(),
                nascimentopre: premature.toLowerCase(),
                altura: height,
                peso: weight,
                cns: '1111111111111111111111',
                planosaude: '1111111111111111111111'
            }

            const child = await ChildrenService.create(
                data
            );

            const response = await GrowthDataService.create({
              childrenId: child.idchildren,
              weight: Number(weight),
              height: Number(height),
              growthDate: birthDate
            });

            // console.log(response);

            const temp = await ChildrenService.readByParent(user.id);
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

                <AddChildButton title='Cadastrar Criança' onPress={() => handleConfirm()}/>

            </S.Content>
        </S.Wrapper>
    )

};

export default RegisterChildrenScreen;
