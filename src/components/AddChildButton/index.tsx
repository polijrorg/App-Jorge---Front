import { View } from 'react-native';
import * as S from './styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';

interface Props {
  onPress: () => void;
  title?: string;
  hidePlus?: boolean;
  invertColors?: boolean;
}

export default function AddChildButton({
  onPress,
  title = 'Adicionar Criança',
  hidePlus = false,
  invertColors = false
}: Props) {
  return (
    <S.Button invert={invertColors} onPress={onPress}>
      <S.Label invert={invertColors}>{title}</S.Label>
      {!hidePlus && (
        <View style={{ padding: 1, backgroundColor: invertColors ? '#4D91B6' : '#FFF', borderRadius: 100 }}>
            <Ionicons name="add" size={20} color={invertColors ? '#FFF' : '#4D91B6'} />
        </View>
      )}
    </S.Button>
  );
}
