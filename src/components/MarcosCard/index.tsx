import MarcosButton from '@components/MarcosCardButton'
import React from 'react'
import { View } from 'react-native'
import * as S from './styles'

interface Props {
    image: any;
    text: string;
}

export default function MarcosCard(p: Props) {
    return (
        <View style={{ alignItems: 'center' }}>
            <S.Container>
                <S.Description>{p.text}</S.Description>
                <S.Img src={p.image} />
            </S.Container>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: -20 }}>
                <MarcosButton onPress={() => 1} title={'Sim'} />
                <MarcosButton onPress={() => 1} title={'Talvez'} />
                <MarcosButton onPress={() => 1} title={'Ainda Não'} />
            </View>
        </View>
    )
}