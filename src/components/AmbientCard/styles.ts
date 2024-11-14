import { View, Image, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";

export const Wrapper = styled(View)`
    justify-content: center;
    align-items: center;
    width: 64px;
`

export const Card = styled(TouchableOpacity)`
    height: 54px;
    width: 54px;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    background-color: ${({ theme }) => theme.colors.ambientCard };
`

export const Logo = styled(Image)`
    height: 24px;
    width: 24px;
    colorTint: black;
`

export const Title = styled(Text)`
    color: black;
    font-family: 'Poppins_500Medium';
    text-align: center;
    margin-top: 10px;
    font-size: 8px
`