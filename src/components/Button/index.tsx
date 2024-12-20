import * as S from './styles';
import React from 'react';

interface Props {
    title: string,
    onPress: () => void
}

export const Button = ({title, onPress}: Props) => {
    return (
        <S.button onPress={onPress}>
            <S.text>{title}</S.text>
        </S.button>
    )
}