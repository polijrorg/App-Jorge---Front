import { ScrollView, Text, View } from 'react-native';
import styled from 'styled-components/native';

export const Wrapper = styled(View)`
    flex: 1;
    align-items: center;
    justify-content: top;
    background: ${({ theme }) => theme.colors.background };
`;

export const Content = styled(ScrollView).attrs({
  contentContainerStyle: {
      alignItems: "center",
      padding: 16,
      gap: 16,
  },
})`
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
    margin-top: 0px;
    margin-bottom: 0px;
`