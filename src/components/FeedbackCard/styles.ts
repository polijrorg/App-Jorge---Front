import { View, TouchableOpacity, Text, TextInput } from "react-native";
import styled from "styled-components";

export const Wrapper = styled(View)`
    width: 100%;
    border-radius: 16px;
    background-color: ${({theme}) => theme.colors.cinza};
    padding: 10px;
    gap: 5px;
`

export const Button = styled(TouchableOpacity)`
    background-color: #4D91B6;
    border-radius: 8px;
    padding: 3px 8px;
    justify-content: center;
    align-items: center;
    max-Height: 40px;
    min-Height: 40px;
`

export const Label = styled(Text)`
    color: white;
    font-size: 14px;
    font-family: 'PoppinsRegular'
`

export const Container = styled(TextInput)`
    min-height: 80px;
    max-height: 80px;
    background-color: white;
    padding: 10px 10px 10px 16px;
    border-radius: 8px;
    width: 100%;
    border: solid 1px lightgray;
    elevation: 1;
`;