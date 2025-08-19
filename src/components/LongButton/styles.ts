import { TouchableOpacity, Text } from "react-native";
import styled from "styled-components/native";

export const button = styled(TouchableOpacity)`
    border-radius: 1000000000px;
    background: #006ADC;
    flex-direction: row;
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid 1px lightgray;
    padding: 8px 16px;
`

export const text = styled(Text)`
    color: #FDFCFE;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    letter-spacing: 0.5px;
    font-family: "Poppins_600SemiBold";
`