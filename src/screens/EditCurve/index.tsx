import * as S from './styles';
import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Bebe from '@assets/icons/Bebe.png';
import { useChildContext } from '@hooks/useChild';
import ChildrenHeader from '@components/ChildrenHeader';
import ChildCard from '@components/ChildCard';
import InsertDataModal from '@components/InsertDataModal';
import AddChildButton from '@components/AddChildButton';
import GrowthData from '@interfaces/GrowthData';
import GrowthDataService from '@services/GrowthDataService';
import EditCurveModal from '@components/EditCurveModal';

interface RowData {
  weight: string,
  height: string,
  growthDate: string
}

function formatAge(data: { months: number, years: number }) {
  const years = data.years ? `${data.years}a` : '';
  const months = data.months ? `${data.months}m` : '';
  if (!data.years && !data.months) return '0m';
  return years + months;
}

function tableHeader() {
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
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
    const { activeChild, setGrowthData, growthData } = useChildContext();
    const [insertModal, setInsertModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [selectedRow, setSelectedRow] = useState<GrowthData>({} as GrowthData);

    async function fetchData() {
      // console.log(activeChild.name)
      const data = await GrowthDataService.getByChild(activeChild.idchildren);
      const sortedData = data.sort((a, b) => {
        const ageA = findAge(a.growthDate).totalAge;
        const ageB = findAge(b.growthDate).totalAge;
        return ageA - ageB;
      });
      setGrowthData(sortedData);
    }

  function findAge(comparisonDate: string): { years: number, months: number, totalAge?: number } {
    if (!activeChild?.nascimento) return { years: 0, months: 0 };
    
    const [birthDay, birthMonth, birthYear] = activeChild.nascimento.split('/').map(Number);
    const [compDay, compMonth, compYear] = comparisonDate.split('/').map(Number);
    
    let years = compYear - birthYear;
    let months = compMonth - birthMonth;
    
    if (months < 0) {
      years--;
      months += 12;
    }
    
    if (compDay < birthDay) {
      months--;
    }
    
    return { years, months, totalAge: years * 12 + months };
  }

    async function onInsertClose(data: RowData) {
      await GrowthDataService.create({
          childrenId: activeChild.idchildren,
          weight: Number(data.weight),
          height: Number(data.height),
          growthDate: data.growthDate
      });
      await fetchData();
      setInsertModal(false);
  }
  
    async function onDelete() {
      GrowthDataService.deleteById(selectedRow.id);
      setEditModal(false);
      fetchData();
    }

    async function onEditClose(data: RowData) {
      (async () => {
        await GrowthDataService.update({
            childrenId: activeChild.idchildren,
            weight: Number(data.weight),
            height: Number(data.height),
            growthDate: data.growthDate
        },
        selectedRow.id
      );
        await fetchData();
        setEditModal(false);
      })();
    }

    useEffect(() => {
      fetchData();
    }, [activeChild])

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
                  name={activeChild?.name || 'name'}
                  birthDate={activeChild?.nascimento || ''}
                  weight={`${activeChild?.peso}kg` || 'weight'}
                  height={`${activeChild?.altura}cm` || 'height'}
                  id={`${activeChild?.idchildren}` || '0'}
                  gender={activeChild.gender}
                />
                <S.Line />
                {growthData.length > 0 ? tableHeader() : <S.EmptyText>Insira os dados de crescimento de {activeChild.name} pelo botão abaixo</S.EmptyText>}
              </>
            )}
            ListFooterComponent={() => (
              <S.Container>
                <AddChildButton invertColors={true} title='Adicionar Dados' onPress={() => {
                  setInsertModal(true);
                }} />
                <AddChildButton title='Salvar' hidePlus={true} onPress={() => 1} />
              </S.Container>
            )}
            data={growthData}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedRow(item); setEditModal(true);
                }}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 8,
                  borderBottomColor: 'lightgray',
                  borderBottomWidth: 1
                }
              }>
                <S.Description>{formatAge(findAge(item.growthDate))}</S.Description>
                <S.Description>{item.weight}</S.Description> 
                <S.Description>{item.height}</S.Description>
                <S.Description>{item.imc.toFixed(1)}</S.Description>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              padding: 16
            }}
            style={{ flex: 1, width: '100%' }}
          />

          <InsertDataModal
            nascimento={activeChild.nascimento}
            onClose={(a: RowData) => onInsertClose(a)}
            onCancel={() => setInsertModal(false)}
            visible={insertModal}
          />

          <EditCurveModal
            nascimento={activeChild.nascimento}
            onClose={(a: RowData) => onEditClose(a)}
            onCancel={() => setEditModal(false)}
            onDelete={() => onDelete()}
            visible={editModal}
            originalData={selectedRow}
          />

        </S.Wrapper>
    )

};

export default EditCurveScreen;
