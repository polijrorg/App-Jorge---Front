import { View, Text } from "react-native";
import styled from "styled-components/native";

export const Wrapper = styled(View)`
    flex: 1;
    flex-direction: column;
    justify-content: top;
    gap: 20px;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.background};
    min-height: 100%;
    padding: 24px;
    padding-top: 30%;
`;

export const Logo = styled.Image`
    width: 50px;
    height: 50px;
`

export const BlueText = styled(Text)`
    color: #4E92B7;
    font-feature-settings: 'liga' off, 'clig' off;
    font-size: 12px;
    line-height: 24px; /* 200% */
    letter-spacing: 0.5px;
    font-family: "Poppins_600SemiBold";
`

export const BlackText = styled(Text)`
    font-feature-settings: 'liga' off, 'clig' off;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 200% */
    letter-spacing: 0.5px;
    font-family: "Poppins_600SemiBold";
`

export const TitleText = styled(Text)`
    color: #000;
    font-feature-settings: 'liga' off, 'clig' off;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 133.333% */
    letter-spacing: 0.5px;
    font-family: "Poppins_600SemiBold";
`

export const Line = styled(View)`
    height: 0px;
    width: 100%;
    border: 0.7px;
    border-color: black;
`

export const Password = styled(View)`
    width: 100%;

`