import React from 'react';
import { View, Text, Image } from 'react-native';
import * as S from './styles';

const ReminderCard = () => {

    return (
        <S.Container>
            <S.LeftSection>
                <S.MonthText>set</S.MonthText>
            </S.LeftSection>
            <S.Content>
                <S.Card>
                    <S.ImageWrapper>
                        <S.ProfileImage source={{ uri: 'https://via.placeholder.com/50' }} />
                    </S.ImageWrapper>
                    <S.TextWrapper>
                        <S.NameText>Rafaela - 18m</S.NameText>
                        <S.NormalText>Vacina chegando!</S.NormalText>
                        <S.HighlightText>Imunização gripe 2ª dose.</S.HighlightText>
                        <S.NormalText>Campanha a partir de <S.HighlightText>20 set</S.HighlightText></S.NormalText>
                    </S.TextWrapper>
                </S.Card>
                <S.Separator />
                <S.Card>
                    <S.ImageWrapper>
                        <S.ProfileImage source={{ uri: 'https://via.placeholder.com/50' }} />
                    </S.ImageWrapper>
                    <S.TextWrapper>
                        <S.NameText>Rafaela</S.NameText>
                        <S.NormalText>Vacina chegando!</S.NormalText>
                        <S.HighlightText>Imunização gripe 2ª dose.</S.HighlightText>
                        <S.NormalText>Campanha a partir de <S.HighlightText>20 set</S.HighlightText></S.NormalText>
                    </S.TextWrapper>
                </S.Card>
            </S.Content>
        </S.Container>
    );
};

export default ReminderCard;
