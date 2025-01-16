import { View } from 'react-native';
import * as S from './styles';
import React from 'react';
import Medicine from '@interfaces/Medicine';

const safetyData = {
  1: {
    color: '#50D76E',
    title: 'Seguro',
    description: 'Dê preferencia e pode utilizar sem maiores problemas.',
  },
  2: {
    color: '#DB9E27',
    title: 'Parcialmente seguro',
    description: 'Dê preferencia a outros medicamentos, potencialmente causa de problemas.',
  },
  3: {
    color: '#D07327',
    title: 'Inseguro',
    description: 'Não utilize esses medicamentos nas condições dispostas, dê preferência total para alternativas.',
  },
  4: {
    color: '#B94A48',
    title: 'Muito inseguro',
    description: 'Medicamento potencialmente tóxico e perigoso no contexto, evite totalmente o consumo.',
  },
}

interface Props {
  medicine: Medicine
}

export default function MedicineDetails({ medicine }: Props) {

  const {color, title, description} = safetyData[medicine.classification];

  return (
    <S.Wrapper>
      <S.Title color={color}>{medicine.name}</S.Title>

      <S.ScaleContainer>
        <S.Color color={color} />
        <View style={{ flex: 1 }}>
          <S.Title size={14}>{title}</S.Title>
          <S.Description size={12}>{description}</S.Description>
        </View>
      </S.ScaleContainer>

      <View style={{ width: '100%' }}>
        <S.BackgroundColor color={color}>
          <S.Title color='#FFF'>Detalhes</S.Title>
          <S.Description color='#FFF'>● Substância ativa: {medicine.substance}</S.Description>
          <S.Description color='#FFF'>● Classe: {medicine.class}</S.Description>
          {
            medicine.observation &&
            <S.Description color='#FFF'>● Observações: {medicine.observation}</S.Description>
          }
          {
            medicine.alternative &&
            <S.Description color='#FFF'>● Alternativas: {medicine.alternative}</S.Description>
          }
        </S.BackgroundColor>
        <S.BackgroundColor color='#E6E6E6'>
          <S.Title>Fonte</S.Title>
          <S.Description size={12}>{medicine.source}</S.Description>
        </S.BackgroundColor>
      </View>

    </S.Wrapper>
  );
}