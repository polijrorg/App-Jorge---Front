import React from 'react';
import { View, Text, Image } from 'react-native';
import Seringa from '@assets/icons/Seringa.png';
import Graph from '@assets/icons/Graph.png';
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
                        <S.ProfileImage tintColor='#FFF' source={Seringa} />
                    </S.ImageWrapper>
                    <S.TextWrapper>
                        <S.NormalText>Vacina chegando!</S.NormalText>
                        <S.HighlightText>Imunização gripe 2ª dose.</S.HighlightText>
                        <S.NormalText>Campanha a partir de <S.HighlightText>20 set</S.HighlightText></S.NormalText>
                    </S.TextWrapper>
                </S.Card>
                <S.Separator />
                <S.Card>
                    <S.ImageWrapper>
                        <S.ProfileImage tintColor='#FFF' source={Graph} />
                    </S.ImageWrapper>
                    <S.TextWrapper>
                        <S.NormalText>Atualização de marco pendente!</S.NormalText>
                        <S.HighlightText>Imunização gripe 2ª dose.</S.HighlightText>
                        <S.NormalText>Campanha a partir dos <S.HighlightText>16 meses</S.HighlightText></S.NormalText>
                    </S.TextWrapper>
                </S.Card>
            </S.Content>
        </S.Container>
    );
};

export default ReminderCard;
