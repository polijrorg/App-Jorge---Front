import * as S from './styles'
import React from 'react';

interface Props {
    onPress: () => void;
    title: string;
    selected: boolean;
}

export default function MarcosCardButton(p: Props) {
    return (
        <S.Container selected={p.selected} onPress={p.onPress}>
            <S.Title>{p.title}</S.Title>
        </S.Container>
    )
}