import DefaultHeader from '@components/DefaultHeader';
import * as S from './styles';
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FeedbackCard from '@components/FeedbackCard';
import ChildCard from '@components/ChildCard';
import Bebe from '@assets/icons/Bebe.png'
import AddChildButton from '@components/AddChildButton';

const MyChildrenScreen = ({ navigation }) => {

    return (
        <S.Wrapper>
            <DefaultHeader />
            <S.Content>
                <View style={{ gap: 10, flexDirection: 'row', width: '100%' }}>
                    <S.Button onPress={() => navigation.goBack()} >
                        <Ionicons name="arrow-back-outline" size={20} color="white" />
                    </S.Button >
                    <S.Title>Suas Crianças</S.Title>
                </View>
                <S.Line />
                <ChildCard name={'Carlos'} age={'12 meses'} weight={'10kg'} height={'180cm'} developmentPercentage={80} vaccinePercentage={50} avatar={Bebe} />
                <AddChildButton onPress={() => navigation.navigate('RegisterChildren')}/>
            </S.Content>
        </S.Wrapper>
    )

};

export default MyChildrenScreen;
