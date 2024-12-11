import { View, Image, Text } from "react-native";
import styled from "styled-components";


export const Container = styled(View)`
    background-color: #CBB6D5;
    border-radius: 16px;
    padding: 20px;
    padding-bottom: 40px;
`

export const Img = styled(Image)`
    border-radius: 16px;
`

export const Description = styled(Text)`
    color: #000;
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;
    font-size: 14px;
    font-style: normal;
    line-height: 24px;
    letter-spacing: 0.5px;
    font-family: "Poppins_600SemiBold";
`