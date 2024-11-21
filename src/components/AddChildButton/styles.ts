import { TouchableOpacity, Text } from "react-native";
import styled from "styled-components";

export const Button = styled(TouchableOpacity)`
    padding: 4px 20px;
    gap: 10px;
    background-color: ${({theme}) => theme.colors.textHighlight};
    flex-direction: row;
    align-items: center;
    border-radius: 8px;
`

export const Label = styled(Text)`
    font-family: 'Poppins_600SemiBold';
    font-size: 14px;
    color: white;
`