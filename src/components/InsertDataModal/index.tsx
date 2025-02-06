import React, { useCallback, useEffect, useState } from 'react'
import * as S from './styles'
import { Modal, TouchableWithoutFeedback } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import ChildrenService from '@services/ChildrenService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useChildContext } from '@hooks/useChild';
import { ChildInput } from '@components/ChildInput';
import AddChildButton from '@components/AddChildButton';

interface NewRowData {
  weight: string,
  height: string,
  growthDate: string
}

interface Props {
  onClose: (a: NewRowData) => void;
  visible: boolean;
  onCancel: () => void;
}

export default function InsertDataModal(p: Props) {
  
  function handlePress(data: NewRowData) {
    if (!data.weight || !data.height) {
      setError(true);
    } else {
      p.onClose(data);
      setError(false);
      setData({
        height: undefined,
        weight: undefined,
        growthDate: undefined
      });
    }
  }

  const [error, setError] = useState<boolean>(false);
  const [data, setData] = useState<NewRowData>({
    height: undefined,
    weight: undefined,
    growthDate: undefined
  });

  return (
    <Modal visible={p.visible} transparent animationType="fade">
      <S.Fundo onPress={() => p.onCancel()}>
        <TouchableWithoutFeedback>
          <S.Container>
            <S.Title>Adicionar estatura e peso:</S.Title>
            <S.Line />
            <ChildInput
              title='Data'
              value={data.growthDate}
              onChange={(a) => setData(prevData => ({...prevData, growthDate: a}))}
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
            <AddChildButton title='Adicionar Dados' onPress={() => handlePress(data)}/>
          </S.Container>
        </TouchableWithoutFeedback>
      </S.Fundo>
    </Modal>
  )
}