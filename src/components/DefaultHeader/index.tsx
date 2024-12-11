import { StatusBar } from 'expo-status-bar';
import * as S from './styles';
import React from 'react';

export default function DefaultHeader() {
    return (
        <S.Wrapper>
            <StatusBar style="light" />
            <S.Logo source={require('@assets/images/WhiteLogo.png')}/>
        </S.Wrapper>
    );
}