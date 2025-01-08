import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
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
    justify-content: flex-start;
    background: ${({ theme }) => theme.colors.background };
    padding: 16px;
    width: 100%;
    height: 100%;
    gap: 8px;
`;

export const Scroll = styled(ScrollView).attrs(() => ({
  contentContainerStyle: {
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 16,
  },
}))`
  flex: 1;
  background: ${({ theme }) => theme.colors.background };
  width: 100%;
  gap: 8px;
  margin-bottom: 30px;
`;

export const ScaleContainer = styled(View)`
    align-items: center;
    gap: 8px;
    flex-direction: row;
`

export const Color = styled(View)<{ color?: string }>`
    height: 24px;
    width: 24px;
    border-radius: 100px;
    background-color: ${({color}) => color || ''};
`

export const Title = styled(Text)<{ width?: number, size?: number }>`
    color: #000;
    font-family: 'Poppins_600SemiBold';
    font-size: ${({size}) => size || 18}px;
    width: ${({width}) => (width) ? '' : '100%'};
`

export const Number = styled(Text)`
    color: #000;
    font-family: 'Poppins_600SemiBold';
    font-size: 14px;
`

export const Description = styled(Text)<{ width?: number, size?: number }>`
    color: #000;
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

export const Button = styled(TouchableOpacity)`
    background-color: ${({theme}) => theme.colors.header};
    border-radius: 100px;
    padding: 5px;
`
