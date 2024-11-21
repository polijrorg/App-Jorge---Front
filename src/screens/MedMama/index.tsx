import DefaultHeader from '@components/DefaultHeader';
import * as S from './styles';
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import SearchBox from '@components/SearchBox';

const MyChildrenScreen = ({ navigation }) => {

    return (
        <S.Wrapper>
            <DefaultHeader />
            <S.Content>
                <View style={{ gap: 10, flexDirection: 'row', width: '100%' }}>
                    <S.Button onPress={() => navigation.goBack()} >
                        <Ionicons name="arrow-back-outline" size={20} color="white" />
                    </S.Button >
                    <S.Title>MedMama</S.Title>
                </View>
                <S.Line />
                <SearchBox/>
            </S.Content>
        </S.Wrapper>
    )

};

export default MyChildrenScreen;
