import { TouchableOpacity } from "react-native";
import * as S from './styles'
import React from "react";
import { View } from "react-native";

export const ReadAndAgree = ({ isChecked, blueText, blackText, onPress, onTextPress }) => {
    return (
        <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'center' }}>
            <S.Checkbox onPress={onPress} style={{ backgroundColor: isChecked ? '#006ADC' : 'white' }}>
                <S.Cross>X</S.Cross>
            </S.Checkbox>
            <View style={{ flexDirection: 'row', gap: 4 }}>
                <S.BlackText>{blackText}</S.BlackText>
                <TouchableOpacity onPress={onTextPress} >
                    <S.BlueText>{blueText}</S.BlueText>
                </TouchableOpacity>
            </View>
        </View>
    );
}