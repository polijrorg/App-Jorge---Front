import { TouchableOpacity, Text } from "react-native";
import styled from "styled-components";

export const button = styled(TouchableOpacity)`
    border-radius: 1000000000px;
    background: #006ADC;
    display: flex;
    width: 126px;
    height: 36px;
    justify-content: center;
    align-items: center;
    border: solid 1px lightgray;
    elevation: 1;
`

export const text = styled(Text)`
    color: #FDFCFE;
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;
    font-size: 16px;
    font-style: normal;
    line-height: 24px; /* 150% */
    letter-spacing: 0.5px;
    font-family: "Poppins_600SemiBold";
`