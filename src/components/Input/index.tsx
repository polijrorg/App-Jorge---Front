import Ionicons from '@expo/vector-icons/Ionicons';
import * as S from './styles'
import React, { useState } from "react";

interface Props {
    title: string,
    value: string,
    onChangeText: (a: string) => void;
    hideOption?: boolean;
}

export function Input({hideOption = false, title, value, onChangeText}: Props) {

    const [isHidden, setIsHidden] = useState<boolean>(hideOption)

    return(
        <S.Wrapper>
            <S.Title>{title}</S.Title>
            <S.Container 
                placeholderTextColor='lightgray'
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={isHidden}
            />
            {hideOption && (
                <S.ToggleButton onPress={() => setIsHidden(!isHidden)}>
                    <Ionicons name={isHidden ? 'eye-outline' : 'eye-off-outline'} size={20} color='dark'/>
                </S.ToggleButton>
            )}
        </S.Wrapper>
        
    );
}