import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";

export const Container = styled(View)`
    padding: 16px;
    justify-content: center;
    align-items: center;
    background-color: #FFF;
    border: 1px lightgray;
    width: 90%;
    gap: 4px;
    border-radius: 8px;
    max-height: 400px;
`

export const Fundo = styled(View)`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
`

export const Description = styled(Text)`
    color: #000;
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;
    font-size: 14px;
    font-style: normal;
    line-height: 24px;
    letter-spacing: 0.5px;
    font-family: "PoppinsRegular";
`

export const Title = styled(Text)<{ selected: boolean }>`
    color: ${({ selected }) => selected ? '#FFF' : 'rgba(0, 0, 0, 0.5)'};
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;
    font-size: 14px;
    font-style: normal;
    line-height: 24px;
    letter-spacing: 0.5px;
    font-family: "Poppins_600SemiBold";
`

export const Line = styled(View)`
    border: 0.5px lightgray;
    height: 0px;
    width: 100%;
    margin-bottom: 4px;
`

export const Button = styled(TouchableOpacity)<{ selected: boolean }>`
    border-radius: 8px;
    background-color: ${({ selected }) => selected ? '#7BB0CC' : ''};
    width: 100%;
    padding: 8px;
`