import MarcosButton from '@components/MarcosCardButton'
import React from 'react'
import { View } from 'react-native'
import * as S from './styles'

interface Props {
    image: any;
    text: string;
    color?: number;
}

export default function MarcosCard(p: Props) {
    return (
        <View style={{ alignItems: 'center', width: '100%' }}>
            <S.Container color={p.color || 1}>
                <S.Description>{p.text}</S.Description>
                <S.Img src={p.image} />
            </S.Container>
            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 16, marginTop: -20, width: '100%' }}>
                <MarcosButton onPress={() => 1} title={'Sim'} />
                <MarcosButton onPress={() => 1} title={'Não sei'} />
                <MarcosButton onPress={() => 1} title={'Ainda Não'} />
            </View>
        </View>
    )
}