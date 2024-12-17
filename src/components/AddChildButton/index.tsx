import { View } from 'react-native';
import * as S from './styles'
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';

interface Props {
    onPress: () => void;
    title?: string;
}

export default function AddChildButton(p: Props) {
    return (
        <S.Button onPress={p.onPress}>
            <S.Label>{p.title || 'Adicionar Criança'}</S.Label>
            <View style={{ padding: 1, backgroundColor: 'white', borderRadius: 100 }} >
                <Ionicons name='add' size={20} color={'#4D91B6'}/>
            </View>
        </S.Button>
    );
} 