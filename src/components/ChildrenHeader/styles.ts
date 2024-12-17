import { View, Image, Text } from "react-native";
import styled from "styled-components";

export const Wrapper = styled(View)`
    width: 100%;
    height: 72px;
    background-color: ${({theme}) => theme.colors.header};
    justify-content: center;
    align-items: center;
    
`;

export const Logo = styled(Image)`
    width: 25px;
    height: 25px;
    margin-top: 32px;
`

export const Title = styled(Text)`
    color: #FFF;
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.5px;
    font-family: "Poppins_600SemiBold";
`