import { View } from 'react-native';
import * as S from './styles';
import React from 'react';
import Medicine from '@interfaces/Medicine';

const safetyData = {
  1: {
    color: '#50D76E',
    title: 'Compatível',
    description: 'Produto seguro e/ou a amamentação é a melhor opção.',
  },
  2: {
    color: '#DB9E27',
    title: 'Compatibilidade Provável',
    description: 'Relativamente seguro. Efeitos adversos leves ou improváveis. Compatível em certas circunstâncias. Acompanhamento recomendado.',
  },
  3: {
    color: '#D07327',
    title: 'Compatibilidade Limitada',
    description: 'Inseguro. Efeitos adversos moderados/graves. Compatível em certas circunstâncias. Acompanhamento recomendado. Utilize uma alternativa mais segura ou suspenda a amamentação.',
  },
  4: {
    color: '#B94A48',
    title: 'Incompatível',
    description: 'Muito inseguro. Contraindicado. Recomenda-se o uso de uma alternativa ou a suspensão da amamentação.',
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
        <S.Description>● Substância ativa: {medicine.substance}</S.Description>
        <S.Description>● Classe: {medicine.class}</S.Description>
      </View>

      <View style={{ width: '100%' }}>
        {(medicine.alternative || medicine.observation) &&
          <S.BackgroundColor color={color}>
            <S.Title color='#FFF'>Detalhes</S.Title>
            {
              medicine.observation &&
              <S.Description color='#FFF'>● Observações: {medicine.observation}</S.Description>
            }
            {
              medicine.alternative &&
              <S.Description color='#FFF'>● Alternativas: {medicine.alternative}</S.Description>
            }
          </S.BackgroundColor>
        }
        <S.BackgroundColor color='#E6E6E6'>
          <S.Title>Fonte</S.Title>
          <S.Description size={12}>{medicine.source}</S.Description>
        </S.BackgroundColor>
      </View>

    </S.Wrapper>
  );
}