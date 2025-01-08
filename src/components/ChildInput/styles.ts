import styled from "styled-components";
import { TextInput, Text, View, TouchableOpacity } from "react-native";

export const Container = styled(TextInput)`
    min-height: 42px;
    max-height: 42px;
    background-color: white;
    padding: 0 10px;
    border-radius: 100px;
    width: 100%;
    border: solid 1px lightgray;
    font-family: "PoppinsRegular";
    line-height: 20px;
`;

export const Title = styled(Text)`
    color: gray;
    font-weight: 600;
    font-feature-settings: 'liga' off, 'clig' off;
    font-size: 12px;
    font-style: normal;
    line-height: 24px;
    letter-spacing: 0.5px;
    font-family: "PoppinsRegular";
    
`

export const Wrapper = styled(View)`
    width: 100%;
`

export const ToggleButton = styled(TouchableOpacity)`
    position: absolute;
    right: 10px;
    top: 34px;
`;

export const OptionsContainer = styled(View)`
    width: 90%;
    align-self: center;
    border-top-width: 1px;
    border-top-color: ${({ theme }) => theme.colors.divider };
    border: 1px lightgray;
    background-color: lightgray;
`;

export const Option = styled(Text)`
    padding: 8px;
    font-size: 14px;
    color: #333;
    background-color: ${({ theme }) => theme.colors.background};
    font-family: 'PoppinsRegular';
`;
