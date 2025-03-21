import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import styled from 'styled-components/native';

export const Wrapper = styled(View)`
    flex: 1;
    align-items: center;
    justify-content: top;
    background: ${({ theme }) => theme.colors.background };
`;

export const Content = styled(ScrollView).attrs(() => ({
    contentContainerStyle: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 16,
        gap: 8
    },
}))`
    flex: 1;
    background: ${({ theme }) => theme.colors.background };
    width: 100%;
`;

export const Button = styled(TouchableOpacity)`
    background-color: ${({theme}) => theme.colors.header};
    border-radius: 100px;
    padding: 5px;
`

export const Title = styled(Text)`
    color: #000;
    font-family: 'Poppins_600SemiBold';
    font-size: 18px;
    width: 100%;
`

export const Description = styled(Text)<{ width?: number, size?: number }>`
    color: #000;
    text-align: center;
    font-family: 'PoppinsRegular';
    font-size: ${({size}) => size || 14}px;
    width: ${({width}) => (width) ? '' : '100%'};
`

export const GreenText = styled(Text)<{ width?: number, size?: number }>`
    color: #339248;
    font-family: 'PoppinsRegular';
    font-size: ${({size}) => size || 14}px;
    width: ${({width}) => (width) ? '' : '100%'};
`

export const BlueText = styled(Text)<{ size?: number }>`
    color: ${({ theme }) => theme.colors.textHighlight };
    font-family: 'PoppinsRegular';
    font-size: ${({size}) => size || 14}px;
`

export const Line = styled(View)`
    height: 0px;
    width: 100%;
    border: 0.3px;
    border-color: lightblue;
    margin-bottom: 10px;
    margin-top: 10px;
`