import { TouchableOpacity, Text } from "react-native";
import styled from "styled-components";

export const Button = styled(TouchableOpacity)<{invert: boolean}>`
    padding: 4px 20px;
    gap: 10px;
    background-color: ${({theme, invert}) => invert ? '#FFF' : theme.colors.textHighlight};
    border: ${({invert, theme}) => invert ? '1px solid #4D91B6' : 'none'};
    flex-direction: row;
    align-items: center;
    border-radius: 8px;
`

export const Label = styled(Text)<{invert: boolean}>`
    font-family: 'Poppins_600SemiBold';
    font-size: 14px;
    color: ${({theme, invert}) => !invert ? '#FFF' : theme.colors.textHighlight};
`