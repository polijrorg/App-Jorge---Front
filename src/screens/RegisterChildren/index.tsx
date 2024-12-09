import DefaultHeader from '@components/DefaultHeader';
import * as S from './styles';
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FeedbackCard from '@components/FeedbackCard';
import ChildCard from '@components/ChildCard';
import Bebe from '@assets/icons/Bebe.png'
import AddChildButton from '@components/AddChildButton';
import { ChildInput } from '@components/ChildInput';

const RegisterChildrenScreen = ({ navigation }) => {

    const [name, setName] = useState<string>('');
    const [height, setHeight] = useState<string>('');
    const [birthDate, setBirthDate] = useState<Date>(new Date());
    const [gender, setGender] = useState<string>(null);
    const [premature, setPremature] = useState<string>(null);

    return (
        <S.Wrapper>
            <DefaultHeader />
            <S.Content>
                <View style={{ gap: 10, flexDirection: 'row', width: '100%' }}>
                    <S.Button onPress={() => navigation.goBack()} >
                        <Ionicons name="arrow-back-outline" size={20} color="white" />
                    </S.Button >
                    <S.Title>Cadastrar Criança</S.Title>
                </View>
                <S.Description>Dados Básicos</S.Description>
                <ChildInput title='Nome' value={name} onChange={(a) => setName(a)} />
                <ChildInput title='Data de nascimento' isDate={true} value={birthDate} onChange={(a) => setBirthDate(a)} />

                <S.Description>Marcos Iniciais - Nascimento</S.Description>
                <ChildInput title='Sexo biológico' isSelection={true} options={['Feminino', 'Masculino']} value={gender} onChange={(a) => setGender(a)} />
                <ChildInput title='Nascimento Prematuro' isSelection={true} options={['Sim', 'Não']} value={premature} onChange={(a) => setPremature(a)} />
            </S.Content>
        </S.Wrapper>
    )

};

export default RegisterChildrenScreen;
