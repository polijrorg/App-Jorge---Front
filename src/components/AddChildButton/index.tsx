import { View } from 'react-native';
import * as S from './styles'
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';

export default function AddChildButton({ onPress }) {
    return (
        <S.Button onPress={onPress}>
            <S.Label>Adicionar Criança</S.Label>
            <View style={{ padding: 1, backgroundColor: 'white', borderRadius: 100 }} >
                <Ionicons name='add' size={20} color={'#4D91B6'}/>
            </View>
        </S.Button>
    );
} 