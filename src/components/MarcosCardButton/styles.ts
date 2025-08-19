import { TouchableOpacity, Text } from "react-native";
import styled from "styled-components/native";

export const Container = styled(TouchableOpacity)<{ selected: boolean }>`
    elevation: 3;
    padding: 8px 16px;
    background-color: ${({ selected }) => selected ? '#95DDFF' : '#FFF'}; 
    border-radius: 8px;
`

export const Title = styled(Text)`
    color: #000;
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;
    font-size: 14px;
    font-style: normal;
    line-height: 24px; /* 150% */
    letter-spacing: 0.5px;
    font-family: "Poppins_600SemiBold";
`