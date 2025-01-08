import * as S from './styles';
import React, { useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Bebe from '@assets/icons/Bebe.png';
import { useChildContext } from '@hooks/useChild';
import ChildrenHeader from '@components/ChildrenHeader';
import ChildCard from '@components/ChildCard';
import CurveEditModal from '@components/EditCurveModal';
import AddChildButton from '@components/AddChildButton';

interface Row {
  date: Date;
  height: number;
  weight: number;
}

function calculateIMC(height: number, weight: number) {
  return Math.round(weight / (height * height / 10000));
}

function findAgeFromDate(date: Date): { years: number, months: number } {
  const today = new Date();
  let years = today.getFullYear() - date.getFullYear();
  let months = today.getMonth() - date.getMonth();
  
  if (today.getDate() < date.getDate()) {
      months--;
  }

  if (months < 0) {
      years--;
      months += 12;
  }
  
  return { years, months };
}

function tableHeader() {
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 8,
      borderBottomColor: 'dodgerblue',
      borderBottomWidth: 1
    }}>
      <S.Description color='dodgerblue'>Idade</S.Description>
      <S.Description color='dodgerblue'>Peso (kg)</S.Description>
      <S.Description color='dodgerblue'>Estatura (cm)</S.Description>
      <S.Description color='dodgerblue'>IMC</S.Description>
    </View>
  );
}
const EditCurveScreen = ({ navigation }) => {
    const { activeChild: child } = useChildContext();
    const [editModal, setEditModal] = useState<boolean>(false);
    const [data, setData] = useState<Row[]>([]);

    return (
        <S.Wrapper>
          <ChildrenHeader />
          <FlatList
            ListHeaderComponent={() => (
              <>
                <View style={{ gap: 10, flexDirection: 'row', width: '100%', marginBottom: 8 }}>
                  <S.Button onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-outline" size={20} color="white" />
                  </S.Button>
                  <S.Title>Curva de Crescimento</S.Title>
                </View>

                <ChildCard
                  isEditable={false}
                  name={child?.name || 'name'}
                  birthDate={child?.nascimento || ''}
                  weight={`${child?.peso}kg` || 'weight'}
                  height={`${child?.altura}cm` || 'height'}
                  developmentPercentage={80}
                  vaccinePercentage={80}
                  avatar={Bebe}
                />
                <S.Line />
                {tableHeader()}
              </>
            )}
            ListFooterComponent={() => (
              <S.Container>
                <AddChildButton invertColors={true} title='Adicionar Dados' onPress={() => {
                  setEditModal(true);
                }} />
                <AddChildButton title='Salvar' hidePlus={true} onPress={() => 1} />
              </S.Container>
            )}
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setEditModal(true)}  style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 8,
                borderBottomColor: 'lightgray',
                borderBottomWidth: 1
              }}>
                <S.Description>{findAgeFromDate(item.date).months}/12</S.Description>
                <S.Description>{item.weight}</S.Description>
                <S.Description>{item.height}</S.Description>
                <S.Description>{calculateIMC(item.height, item.weight)}</S.Description>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              padding: 16
            }}
            style={{ flex: 1, width: '100%' }}
          />
          <CurveEditModal onClose={(a: Row) => {
              setData(prevData => [...prevData, a]);
              setEditModal(false);
              console.log(data);
            }}
            onCancel={() => setEditModal(false)}
            visible={editModal}
          />

        </S.Wrapper>
    )

};

export default EditCurveScreen;
