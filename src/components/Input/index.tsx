import { TextInputProps } from "react-native";
import * as S from './styles'

interface Props {
    title: string,
    value: string,
    onChangeText: (a: string) => void;
}

export function Input({title, value, onChangeText}: Props) {
    return(
        <S.Wrapper>
            <S.Title>{title}</S.Title>
            <S.Container 
                placeholderTextColor='lightgray'
                value={value}
                onChangeText={onChangeText}
            />
        </S.Wrapper>
        
    );
}