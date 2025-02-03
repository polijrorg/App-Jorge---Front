import React from 'react';
import * as S from './styles';

type CurveTypeButtonProps = {
  text: string;
  selected: boolean;
  onPress: () => void;
};

export default function CurveTypeButton({ text, selected, onPress }: CurveTypeButtonProps) {
  return (
    <S.Button selected={selected} onPress={onPress}>
      <S.ButtonText selected={selected}>{text}</S.ButtonText>
    </S.Button>
  );
};