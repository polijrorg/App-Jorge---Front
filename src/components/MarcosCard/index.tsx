import MarcosButton from '@components/MarcosCardButton'
import React from 'react'
import { View } from 'react-native'
import * as S from './styles'
import MarcosService from '@services/MarcosService';
import { useChildContext } from '@hooks/useChild';

interface Props {
    image: any;
    text: string;
    color?: number;
    number: string;
    status: string;
    onStatusChange: (number: string, status: string) => void;
}

export default function MarcosCard(p: Props) {
  const { activeChild } = useChildContext();

  async function handleSelect(status: string) {
    p.onStatusChange(p.number, status);
    await MarcosService.upsert({
      childrenId: activeChild.idchildren,
      number: p.number,
      status: status,
    });
  }

  return (
    <View style={{ alignItems: 'center', width: '100%' }}>
      <S.Container color={p.color || 1}>
        <S.Description>{p.text}</S.Description>
        <S.Img source={p.image} />
      </S.Container>
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 16, marginTop: -20, width: '100%' }}>
        <MarcosButton selected={p.status == 'Sim'} onPress={() => handleSelect('Sim')} title={'Sim'} />
        <MarcosButton selected={p.status == 'Naosei'} onPress={() => handleSelect('Naosei')} title={'Não sei'} />
        <MarcosButton selected={p.status == 'AindaNao'} onPress={() => handleSelect('AindaNao')} title={'Ainda Não'} />
      </View>
    </View>
  )
}