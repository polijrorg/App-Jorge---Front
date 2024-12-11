import * as S from './styles'
import React from 'react';

interface Props {
    onPress: () => void;
    title: string;
}

export default function MarcosCardButton(params: Props) {
    return (
        <S.Container onPress={params.onPress}>
            <S.Title>{params.title}</S.Title>
        </S.Container>
    )
}