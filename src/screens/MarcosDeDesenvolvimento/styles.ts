import { Text, TouchableOpacity, View, ScrollView } from 'react-native';
import styled from 'styled-components/native';

export const Wrapper = styled(View)`
    flex: 1;
    align-items: center;
    justify-content: top;
    background: ${({ theme }) => theme.colors.background };
`;

export const Content = styled(View)`
    justify-content: flex-start;
    align-items: center;
    gap: 16px;
    padding: 16px;
    flex: 1;
    background: ${({ theme }) => theme.colors.background};
    width: 100%;
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
    font-family: 'Poppins_600SemiBold';
    font-size: ${({size}) => size || 14}px;
    width: ${({width}) => (width) ? '' : '100%'};
    line-height: 20px;
    padding-top: 16px;
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
    margin-top: 10px;
    margin-bottom: 10px;
`

export const Button = styled(TouchableOpacity)`
    background-color: ${({theme}) => theme.colors.header};
    border-radius: 100px;
    padding: 5px;
`