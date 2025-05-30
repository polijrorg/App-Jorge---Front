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
        gap: 8,
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
    font-family: 'PoppinsRegular';
    text-align: center;
    font-size: ${({size}) => size || 14}px;
    width: ${({width}) => (width) ? '' : '100%'};
`

export const ColoredText = styled(Text)<{ color: string }>`
    color: ${({ color }) => color};
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

export const ButtonContainer = styled(TouchableOpacity)<{ selected: boolean }>`
  border-radius: 8px;
  background-color: ${props => props.selected ? '#7BB0CC' : 'none'};
  padding: 8px;
`

export const ButtonText = styled(Text)<{ selected: boolean }>`
  color: ${props => props.selected ? '#FDFDFD' : '#000'};
  font-family: PoppinsRegular;
  font-size: 10px;
`

export const Row = styled(View)`
  flex-direction: row;
`