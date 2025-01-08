import { View } from 'react-native';
import * as S from './styles';
import React from 'react';

const safetyData = {
  seguro: {
    color: '#50D76E',
    title: 'Seguro',
    description: 'Dê preferencia e pode utilizar sem maiores problemas.',
  },
  'parcialmente seguro': {
    color: '#DB9E27',
    title: 'Parcialmente seguro',
    description: 'Dê preferencia a outros medicamentos, potencialmente causa de problemas.',
  },
  inseguro: {
    color: '#D07327',
    title: 'Inseguro',
    description: 'Não utilize esses medicamentos nas condições dispostas, dê preferência total para alternativas.',
  },
  'muito inseguro': {
    color: '#B94A48',
    title: 'Muito inseguro',
    description: 'Medicamento potencialmente tóxico e perigoso no contexto, evite totalmente o consumo.',
  },
}

export default function MedicineDetails(p: {
  name: string,
  safety: string,
  comment: string
}) {

  const {color, title, description} = safetyData[p.safety];

  return (
    <S.Wrapper>
      <S.Title color={color}>{p.name}</S.Title>

      <S.ScaleContainer>
        <S.Color color={color} />
        <View style={{ flex: 1 }}>
          <S.Title size={14}>{title}</S.Title>
          <S.Description size={12}>{description}</S.Description>
        </View>
      </S.ScaleContainer>

      <View>
        <S.BackgroundColor color={color}>
          <S.Title color='#FFF'>Compatibilidade Limitada</S.Title>
          <S.Description color='#FFF'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit adipisci laboriosam obcaecati porro itaque, ea tempora asperiores cumque deserunt delectus nesciunt totam distinctio tempore aspernatur minus atque quas illo veniam!
          </S.Description>
        </S.BackgroundColor>
        <S.BackgroundColor color='#E6E6E6'>
          <S.Description>
            {p.comment}
          </S.Description>
        </S.BackgroundColor>
      </View>

    </S.Wrapper>
  );
}