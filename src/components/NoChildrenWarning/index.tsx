import React from 'react';
import * as S from './styles';

export default function NoChildrenWarning() {
  return (
    <S.Container>
      <S.Description>Você não tem nenhuma criança selecionada! Selecione uma na header para ver mais informações.</S.Description>
    </S.Container>
  )
}