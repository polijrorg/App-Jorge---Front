import styled from "styled-components";
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

export const Checkbox = styled(TouchableOpacity)`
    display: flex;
    width: 24px;
    height: 24px;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    border: solid 1px lightgray;
`

export const BlackText = styled(Text)`
    color: #000;
    font-feature-settings: 'liga' off, 'clig' off;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 200% */
    letter-spacing: 0.5px;
    font-family: "PoppinsRegular";
`

export const BlueText = styled(Text)`
    color: #4E92B7;
    font-feature-settings: 'liga' off, 'clig' off;
    font-size: 12px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.5px;
    font-family: "PoppinsRegular";
`
export const Cross = styled(Text)`
    color: white;
    font-feature-settings: 'liga' off, 'clig' off;
    font-size: 12px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.5px;
    font-family: "PoppinsBlack";
`