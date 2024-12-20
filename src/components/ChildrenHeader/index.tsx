import { StatusBar } from 'expo-status-bar';
import * as S from './styles';
import React, { useCallback, useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, TouchableOpacity } from 'react-native';
import ChildModal from '@components/ChildModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChildrenService from '@services/ChildrenService';
import { useFocusEffect } from '@react-navigation/native';
import { useChildContext } from '@hooks/useChild';

export default function DefaultHeader() {

    const [modal, setModal] = useState<boolean>(false);
    const { activeChild: child } = useChildContext();

    return (
        <S.Wrapper>
            <StatusBar style="light" />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', width: '100%' }}>
                <S.Logo source={require('@assets/images/WhiteLogo.png')}/>
                <TouchableOpacity onPress={() => setModal(true)}  style={{ flexDirection: 'row', gap: 8 }}>
                    <S.Title>{child?.name || '――'}</S.Title>
                    <Ionicons name='chevron-down-circle-outline' size={20} color='#FFF'/>
                </TouchableOpacity>
                <View style={{ width: 32 }} />
            </View>

            <ChildModal onClose={() => setModal(false)} visible={modal} />
        </S.Wrapper>
    );
}