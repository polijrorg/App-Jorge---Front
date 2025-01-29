import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { Modal, TouchableWithoutFeedback } from 'react-native';
import { useChildContext } from '@hooks/useChild';
import { ChildInput } from '@components/ChildInput';
import AddChildButton from '@components/AddChildButton';
import GrowthData from '@interfaces/GrowthData';

interface NewRowData {
  weight: string,
  height: string,
  growthDate: string
}

interface Props {
  onClose: (a: NewRowData) => void;
  visible: boolean;
  onCancel: () => void;
  originalData: GrowthData;
}

const EditCurveModal = (p: Props) => {

    const [error, setError] = useState<boolean>(false);
    const [data, setData] = useState<NewRowData>({
      weight: p.originalData.weight.toString(),
      height: p.originalData.height.toString(),
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
        height: p.originalData.height.toString(),
        weight: p.originalData.weight.toString(),
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
                onChange={(a) => setData(prevData => ({...prevData, date: a}))}
                isDate={true}
              />
              <ChildInput
                title='Altura (em cm)'
                value={data.height}
                onChange={(a) => setData(prevData => ({...prevData, height: a}))}
                isNumber={true}
              />
              <ChildInput
                title='Peso (em kg)'
                value={data.weight}
                onChange={(a) => setData(prevData => ({...prevData, weight: a}))}
                isNumber={true}
                unit='kg'
              />
              <S.Line />
              {error && 
                <S.Title color='red'>Por favor, preencha todos os campos.</S.Title>
              }
              <AddChildButton title='Editar Dados' onPress={handlePress}/>
            </S.Container>
          </TouchableWithoutFeedback>
        </S.Fundo>
      </Modal>
    )
}

export default EditCurveModal;
