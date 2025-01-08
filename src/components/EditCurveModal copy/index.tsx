import React, { useCallback, useEffect, useState } from 'react'
import * as S from './styles'
import { Modal, TouchableWithoutFeedback } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import ChildrenService from '@services/ChildrenService';
import Child from '@interfaces/Child';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useChildContext } from '@hooks/useChild';
import { ChildInput } from '@components/ChildInput';
import AddChildButton from '@components/AddChildButton';

interface Props {
  onClose: () => void;
  visible: boolean;
}

export default function EditCurveModal(p: Props) {

  const { setActiveChild, childList: children, activeChild } = useChildContext();

  async function handlePress(data: Child) {
    setActiveChild(data);
    p.onClose();
  }

  return (
    <Modal visible={p.visible} transparent animationType="fade">
      <S.Fundo onPress={() => p.onClose()}>
        <TouchableWithoutFeedback>
          <S.Container>
            <S.Description>Adicionar estatura e peso:</S.Description>
            <S.Line />
            <ChildInput title='Data' value={Date} onChange={(a) => 1} isDate={true} />
            <ChildInput title='Altura (em cm)' value={100} onChange={(a) => 1} isNumber={true} />
            <ChildInput title='Peso (em kg)' value={100} onChange={(a) => 1} isNumber={true} unit='kg' />
            <S.Line />
            <AddChildButton title='Adicionar Dados' onPress={() => console.log('feito crack')}/>
          </S.Container>
        </TouchableWithoutFeedback>
      </S.Fundo>
    </Modal>
  )
}