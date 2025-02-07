import React from 'react';
import * as S from './styles';

type CurveTypeButtonProps = {
  text: string;
  selected: boolean;
  onPress: () => void;
  allCaps?: boolean;
};

export default function CurveTypeButton({ text, selected, onPress, allCaps }: CurveTypeButtonProps) {
  return (
    <S.Button selected={selected} onPress={onPress}>
      <S.ButtonText selected={selected} allCaps={allCaps}>{text}</S.ButtonText>
    </S.Button>
  );
};