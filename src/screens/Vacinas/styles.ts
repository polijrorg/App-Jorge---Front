import { TouchableOpacity, View, Text, ScrollView } from "react-native";
import styled from "styled-components";

export const Wrapper = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: top;
  background: ${({ theme }) => theme.colors.background };
`;

export const ButtonContainer = styled(TouchableOpacity)<{ color: string }>`
  padding: 8px 6px;
  flex: 1;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${({ color }) => color === 'none' ? '#FFF' : color};
  border: ${({ color }) => color === 'none' ? '0.3px solid #000' : 'none'};
  margin: 4px;
`;

export const MonthButtonContainer = styled(View)`
  padding: 8px 6px;
  flex: 1;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: #FFF;
  margin: 4px;
`

export const ButtonText = styled(Text)`
  font-family: Poppins;
  font-size: 12px;
  text-align: center;
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

export const Line = styled(View)`
  height: 0px;
  width: 100%;
  border: 0.3px;
  border-color: lightblue;
  margin-bottom: 10px;
`

export const ProgressBarBackground = styled(View)`
  height: 8px;
  width: 80px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`;

export const ProgressBarFill = styled(View)`
  height: 100%;
  border-radius: 4px;
`;

export const LegendRow = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px;
`

export const Row = styled(View)`
  flex-direction: row;
  flex: 1;
`

export const Column = styled(View)`
  flex-direction: column;
  flex: 2;
`

export const LegendContainer = styled(View)`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  gap: 8px;
`

export const LegendText = styled(Text)`
  color: #000;
  font-family: 'PoppinsRegular';
  font-size: 10px;
`

export const TableContainer = styled(View)`
  padding: 16px;
  background-color: #E6E6E6;
  border-radius: 16px;
  flex: 1;
  width: 100%;
`

export const TableRow = styled(View)`
  flex-direction: row;
`;