import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const Container = styled(View)`
    padding: 16px;
    justify-content: center;
    align-items: center;
    background-color: #FFF;
    border: 1px lightgray;
    width: 90%;
    gap: 4px;
    border-radius: 8px;
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

export const Title = styled(Text)`
    color: 'rgba(0, 0, 0, 0.5)';
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

export const Button = styled(TouchableOpacity)<{ color: number }>`
    border-radius: 8px;
    background-color: ${({ color }) => {
        switch (color) {
            case 1:
                return 'rgba(110, 53, 139, 0.72)';
            case 2:
                return 'rgba(77, 145, 182, 0.39)';
            case 3:
                return 'rgba(80, 215, 110, 0.36)';
            case 4:
                return 'rgba(238, 144, 96, 0.36)';
            case 5:
                return 'rgba(188, 54, 54, 0.39)';
            default:
                return '#000';
        }
    }};
    width: 100%;
    padding: 8px;
`