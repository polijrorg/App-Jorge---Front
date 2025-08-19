import { View, Image, Text } from "react-native";
import styled from "styled-components/native";


export const Container = styled(View)<{ color: number }>`
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
    border-radius: 16px;
    padding-bottom: 40px;
    width: 100%
`

export const Img = styled(Image)`
    border-radius: 16px;
    width: 100%;
    aspect-ratio: 1/1;
    height: auto;
`

export const Description = styled(Text)`
    color: #000;
    padding: 20px;
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;
    font-size: 14px;
    font-style: normal;
    line-height: 24px;
    letter-spacing: 0.5px;
    font-family: "Poppins_600SemiBold";
`