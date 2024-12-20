import DefaultHeader from '@components/DefaultHeader';
import * as S from './styles';
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import SearchBox from '@components/SearchBox';

const MyChildrenScreen = ({ navigation }) => {

    const medicationData = [
        { id: '1', name: 'Paracetamol' },
        { id: '2', name: 'Ibuprofeno' },
        { id: '3', name: 'Dipirona' },
        { id: '4', name: 'Amoxicilina' },
        { id: '5', name: 'Omeprazol' },
        { id: '6', name: 'Loratadina' },
        { id: '7', name: 'Atenolol' },
        { id: '8', name: 'Metformina' },
        { id: '9', name: 'Fluoxetina' },
        { id: '10', name: 'Sinvastatina' },
      ];

    const [selection, setSelection] = useState<string>('');

    function determineColor(safety: string) {
        switch (safety) {
            case 'Seguro':
                return '#50D76E';
            case 'Parcialmente Seguro':
                return '#DB9E27';
            case 'Inseguro':
                return '#D07327';
            case 'Muito Inseguro':
                return '#B94A48';
        }
    }

    return (
        <S.Wrapper>
            <DefaultHeader />
            <S.Content>
                <View style={{ gap: 10, flexDirection: 'row', width: '100%' }}>
                    <S.Button onPress={() => navigation.goBack()} >
                        <Ionicons name="arrow-back-outline" size={20} color="white" />
                    </S.Button >
                    <S.Title>MedMama</S.Title>
                </View>
                <SearchBox data={medicationData} onSelectItem={(item) => console.log(item)}/>


                {/* <S.Title size={16}>Como funciona?</S.Title>
                <S.Description>Busque por combinações, medicamentos, produtos e alimentos potencialmente perigosos quando combinados, para alergias cadastradas ou para amamentação.</S.Description>
                <S.Line />

                <S.Title size={16}>Entendendo a escala</S.Title>
                <S.Description>A escala a seguir delimita quatro graus de periculosidade em combinar o medicamento buscado as condições descritas, sendo:</S.Description>
                <View style={{ width: '100%', padding: 16, gap: 4 }}>
                    <S.ScaleContainer>
                        <S.Color color='#50D76E'/>
                        <View style={{ width: '100%' }}>
                            <S.Title size={14}>Seguro</S.Title>
                            <S.Description size={12}>Dê preferencia e pode utilizar sem maiores problemas.</S.Description>
                        </View>
                    </S.ScaleContainer>
                    <S.ScaleContainer>
                        <S.Color color='#DB9E27'/>
                        <View style={{ width: '100%' }}>
                            <S.Title size={14}>Parcialmente seguro</S.Title>
                            <S.Description size={12}>Dê preferencia a outros medicamentos, potencialmente cause de problemas.</S.Description>
                        </View>
                    </S.ScaleContainer>
                    <S.ScaleContainer>
                        <S.Color color='#D07327'/>
                        <View style={{ width: '100%' }}>
                            <S.Title size={14}>Inseguro</S.Title>
                            <S.Description size={12}>Não utilize esses medicamentos nas condições dispostas, de preferencia total para alternativas.</S.Description>
                        </View>
                    </S.ScaleContainer>
                    <S.ScaleContainer>
                        <S.Color color='#B94A48'/>
                        <View style={{ width: '100%' }}>
                            <S.Title size={14}>Muito inseguro</S.Title>
                            <S.Description size={12}>Medicamento potencialmente toxico e perigoso no contexto, evite totalmente o consumo.</S.Description>
                        </View>
                    </S.ScaleContainer>
                </View> */}

                <S.Line />
                <S.Title>Tylenol</S.Title>

            </S.Content>
        </S.Wrapper>
    )

};

export default MyChildrenScreen;
