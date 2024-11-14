import styled from "styled-components";
import { TextInput, Text, View } from "react-native";

export const Container = styled(TextInput)`
    min-height: 40px;
    max-height: 40px;
    background-color: white;
    padding: 10px 10px 10px 16px;
    border-radius: 8px;
    width: 100%;
    border: solid 1px lightgray;
    elevation: 1;
`;

export const Title = styled(Text)`
    color: #000;
    font-weight: 600;
    font-feature-settings: 'liga' off, 'clig' off;
    font-size: 12px;
    font-style: normal;
    line-height: 24px; /* 200% */
    letter-spacing: 0.5px;
    font-family: "Poppins_600SemiBold";
`

export const Wrapper = styled(View)`
    width: 100%;
`
