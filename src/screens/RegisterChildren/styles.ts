import { Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';

export const Wrapper = styled(View)`
    flex: 1;
    align-items: center;
    justify-content: top;
    background: ${({ theme }) => theme.colors.background };
`;

export const Content = styled(View)`
    flex: 1;
    align-items: center;
    justify-content: top;
    background: ${({ theme }) => theme.colors.background };
    padding: 16px;
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
    margin-bottom: 20px;
`

export const Button = styled(TouchableOpacity)`
    background-color: ${({theme}) => theme.colors.header};
    border-radius: 100px;
    padding: 5px;
`