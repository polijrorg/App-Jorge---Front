import { TextInputProps, TouchableOpacity } from "react-native";
import * as S from './styles';

interface Props {
    title: string,
    onPress: () => void
}

export const Button = ({title, onPress}: Props) => {
    return (
        <S.button onPress={onPress}>
            <S.text>{title}</S.text>
        </S.button>
    )
}