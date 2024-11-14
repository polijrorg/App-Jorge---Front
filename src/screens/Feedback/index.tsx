import DefaultHeader from '@components/DefaultHeader';
import * as S from './styles';
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FeedbackCard from '@components/FeedbackCard';

const FeedbackScreen = ({ navigation }) => {

    const values = Array.from({ length: 10 }, (a, i) => i + 1);
    const [currentValue, setCurrentValue] = useState<number>();

    return (
        <S.Wrapper>
            <DefaultHeader />

            <S.Content>
                <View style={{ gap: 10, flexDirection: 'row', width: '100%' }}>
                    <S.Button onPress={() => navigation.goBack()} >
                        <Ionicons name="arrow-back-outline" size={20} color="white" />
                    </S.Button >
                    <S.Title>Feedbacks</S.Title>
                </View>
                <FeedbackCard />
                <S.Line />
                
                <S.Title>Avalie nossos serviços</S.Title>
                <View style={{ gap: 10, flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
                    {values.map((value) => (
                        <TouchableOpacity
                            key={value}
                            style={{
                                backgroundColor: value === currentValue ? '#71AAC9' : '#E6E6E6',
                                minWidth: 22,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 100
                            }}
                            onPress={() => setCurrentValue(value)}
                        >
                            <S.Number>{value}</S.Number>
                        </TouchableOpacity>
                    ))}
                </View>
                
            </S.Content>


            
        </S.Wrapper>
    )

};

export default FeedbackScreen;
