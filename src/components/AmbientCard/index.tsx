import * as S from './styles';
import React from 'react';

export default function AmbientCard({ image, title, onPress }) {
    return (
        <S.Wrapper>
            <S.Card onPress={onPress}>
                <S.Logo source={image}/>
            </S.Card>
            <S.Title>{title}</S.Title>
        </S.Wrapper>
    );
}