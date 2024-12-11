import { TouchableOpacity, Text } from "react-native";
import styled from "styled-components";

export const Button = styled(TouchableOpacity)`
    padding: 8px;
    flex-direction: row;
    gap: 4px;
    justify-content: center;
    align-items: center;
`

export const Title = styled(Text)<{ color: number }>`
    color: ${({ color }) => {
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
    font-family: 'Poppins_600SemiBold';
    font-size: 14px;
    line-height: 24px;
`