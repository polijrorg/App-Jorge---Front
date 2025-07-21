import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const Wrapper = styled(SafeAreaView)`
    align-items: center;
    justify-content: top;
    background: ${({ theme }) => theme.colors.background };
    height: 100%;
`;

export const Content = styled(ScrollView).attrs(() => ({
    contentContainerStyle: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 16,
        padding: 16,
    },
}))`
    background: ${({ theme }) => theme.colors.background };
    width: 100%;
    gap: 16px;
`;

export const Title = styled(Text)`
    color: #000;
    font-family: 'Poppins_600SemiBold';
    font-size: 18px;
    width: 100%;
`

export const Number = styled(Text)`
    color: #000;
    font-family: 'Poppins_600SemiBold';
    font-size: 14px;
`

export const Description = styled(Text)<{ width?: number, size?: number }>`
    color: #000;
    font-family: 'PoppinsRegular';
    font-size: 14px;
    width: 100%;
`

export const BlueText = styled(Text)<{ size?: number }>`
    color: #4D91B6;
    font-family: 'PoppinsRegular';
    font-size: 14px;
`

export const Line = styled(View)`
    height: 0px;
    width: 100%;
    border: 0.3px;
    border-color: lightblue;
`

export const Button = styled(TouchableOpacity)`
    background-color: #3A789A;
    border-radius: 100px;
    padding: 5px;
`