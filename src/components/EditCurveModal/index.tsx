import React, { useCallback, useEffect, useState } from 'react'
import * as S from './styles'
import { Modal, TouchableWithoutFeedback } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import ChildrenService from '@services/ChildrenService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useChildContext } from '@hooks/useChild';
import { ChildInput } from '@components/ChildInput';
import AddChildButton from '@components/AddChildButton';

interface Props {
  onClose: (a: Row) => void;
  visible: boolean;
  onCancel: () => void;
}

interface Row {
  date: Date;
  height: number;
  weight: number;
}

export default function EditCurveModal(p: Props) {
  
  function handlePress(data: Row) {
    if (!data.weight || !data.height || !data.date) {
      setError(true);
    } else {
      p.onClose(data);
      setError(false);
      setData({
        date: undefined,
        height: undefined,
        weight: undefined,
      });
    }
  }

  const { setActiveChild, childList: children, activeChild } = useChildContext();
  const [error, setError] = useState<boolean>(false);
  const [data, setData] = useState<Row>({
    date: undefined,
    height: undefined,
    weight: undefined,
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
              value={data.date}
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
            <AddChildButton title='Adicionar Dados' onPress={() => handlePress(data)}/>
          </S.Container>
        </TouchableWithoutFeedback>
      </S.Fundo>
    </Modal>
  )
}