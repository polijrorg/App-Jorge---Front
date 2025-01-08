import DefaultHeader from '@components/DefaultHeader';
import * as S from './styles';
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import SearchBox from '@components/SearchBox';
import MedicineDetails from '@components/MedicineDetails';
import Medicine from '@interfaces/Medicine';

const MyChildrenScreen = ({ navigation }) => {
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [selected, setSelected] = useState<Medicine>(undefined);

    function determineColor(safety: number) {
        switch (safety) {
            case 1:
                return '#50D76E';
            case 2:
                return '#DB9E27';
            case 3:
                return '#D07327';
            case 4:
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
                <SearchBox onSelectItem={(item) => setSelected(item)}/>
                <S.Line />
                {
                  selected ? (
                    <MedicineDetails 
                      medicine={selected}
                    />
                  ) : (
                    <S.Scroll>
                      <S.Title size={16}>Como funciona?</S.Title>
                      <S.Description>Busque por combinações, medicamentos, produtos e alimentos potencialmente perigosos quando combinados, para alergias cadastradas ou para amamentação.</S.Description>
                      <S.Line />

                      <S.Title size={16}>Entendendo a escala</S.Title>
                      <S.Description>A escala a seguir delimita quatro graus de periculosidade em combinar o medicamento buscado as condições descritas, sendo:</S.Description>
                      <View style={{ width: '100%', padding: 16, gap: 4 }}>
                          <S.ScaleContainer>
                              <S.Color color='#50D76E'/>
                              <View style={{ flex: 1 }}>
                                  <S.Title size={14}>Seguro</S.Title>
                                  <S.Description size={12}>Dê preferencia e pode utilizar sem maiores problemas.</S.Description>
                              </View>
                          </S.ScaleContainer>
                          <S.ScaleContainer>
                              <S.Color color='#DB9E27'/>
                              <View style={{ flex: 1 }}>
                                  <S.Title size={14}>Parcialmente seguro</S.Title>
                                  <S.Description size={12}>Dê preferencia a outros medicamentos, potencialmente causa de problemas.</S.Description>
                              </View>
                          </S.ScaleContainer>
                          <S.ScaleContainer>
                              <S.Color color='#D07327'/>
                              <View style={{ flex: 1 }}>
                                  <S.Title size={14}>Inseguro</S.Title>
                                  <S.Description size={12}>Não utilize esses medicamentos nas condições dispostas, dê preferência total para alternativas.</S.Description>
                              </View>
                          </S.ScaleContainer>
                          <S.ScaleContainer>
                              <S.Color color='#B94A48'/>
                              <View style={{ flex: 1 }}>
                                  <S.Title size={14}>Muito inseguro</S.Title>
                                  <S.Description size={12}>Medicamento potencialmente tóxico e perigoso no contexto, evite totalmente o consumo.</S.Description>
                              </View>
                          </S.ScaleContainer>
                      </View>
                    </S.Scroll>
                  )
                }
            </S.Content>
        </S.Wrapper>
    )

};

export default MyChildrenScreen;
