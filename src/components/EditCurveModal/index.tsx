import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { Modal, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { ChildInput } from '@components/ChildInput';
import AddChildButton from '@components/AddChildButton';
import GrowthData from '@interfaces/GrowthData';
import Ionicons from '@expo/vector-icons/Ionicons';

interface NewRowData {
  weight: string,
  height: string,
  growthDate: string
}

interface Props {
  onClose: (a: NewRowData) => void;
  visible: boolean;
  onCancel: () => void;
  onDelete: () => void;
  originalData: GrowthData;
  nascimento: string;
}

function formatDecimal(input: string) {
  let formatted = input.replace(',', '.');
  formatted = formatted.replace(/[^0-9.]/g, '');

  if (formatted.includes('.')) {
    const [intPart, decimalPart] = formatted.split('.');
    formatted = `${intPart}.${decimalPart.slice(0, 2)}`;
  }

  return formatted;
}

const EditCurveModal = (p: Props) => {

    const [error, setError] = useState<boolean>(false);
    const [data, setData] = useState<NewRowData>({
      weight: p.originalData.weight?.toString(),
      height: p.originalData.height?.toString(),
      growthDate: p.originalData.growthDate
    });

    function handlePress() {
      if (!data.weight || !data.height || !data.growthDate) {
        setError(true);
      } else {
        setError(false);
        p.onClose(data);
      }
    }

    useEffect(() => {
      setData({
        height: p.originalData.height?.toString(),
        weight: p.originalData.weight?.toString(),
        growthDate: p.originalData.growthDate,
      });
    }, [p.originalData])

    return (
      <Modal visible={p.visible} transparent animationType="fade">
        <S.Fundo onPress={() => p.onCancel()}>
          <TouchableWithoutFeedback>
            <S.Container>
              <S.Title>Editar estatura e peso:</S.Title>
              <S.Line />
              <ChildInput
                title='Data'
                value={data.growthDate}
                nascimento={p.nascimento}
                onChange={(a) => setData(prevData => ({...prevData, growthDate: a}))}
                isDate
                isEditable
              />
              <ChildInput
                title='Altura (em cm)'
                value={data.height}
                onChange={(a) => setData(prevData => ({...prevData, height: formatDecimal(a)}))}
                isNumber
                isEditable
              />
              <ChildInput
                title='Peso (em kg)'
                value={data.weight}
                onChange={(a) => setData(prevData => ({...prevData, weight: formatDecimal(a)}))}
                isNumber
                unit='kg'
                isEditable
              />
              <S.Line />
              {error && 
                <S.Title color='red'>Por favor, preencha todos os campos.</S.Title>
              }
              <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around' }}>
                <AddChildButton title='Editar Dados' onPress={handlePress}/>
                <TouchableOpacity
                  onPress={p.onDelete}
                  style={{ backgroundColor: '#4D91B6', borderRadius: 8, padding: 8 }}
                >
                  <Ionicons name="trash-outline" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </S.Container>
          </TouchableWithoutFeedback>
        </S.Fundo>
      </Modal>
    )
}

export default EditCurveModal;
