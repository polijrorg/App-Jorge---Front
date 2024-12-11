import React from "react";
import * as S from './styles'
import Ionicons from '@expo/vector-icons/Ionicons';

interface Props {
    title: string;
    onPress: () => void;
    color?: number;
}

export default function MarcosFilterButton(p: Props) {
    return (
        <S.Button onPress={() => p.onPress()}>
            <S.Title color={p.color}>{p.title}</S.Title>
            <Ionicons name='chevron-down-circle-outline' size={20} color='#000'/>
        </S.Button>
    )
}