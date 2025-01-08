import { ScrollView, Text, View } from "react-native";
import styled from "styled-components";

export const Wrapper = styled(View)`
  align-items: center;
  justify-content: top;
  background: ${({ theme }) => theme.colors.background };
  gap: 8px;
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

export const Description = styled(Text)<{ color?: string, size?: number }>`
  color: ${({color}) => color || '#000'};
  font-family: 'PoppinsRegular';
  font-size: ${({size}) => size || 14}px;
`

export const Title = styled(Text)<{ width?: string, size?: number, color?: string }>`
  color: ${({color}) => color || '#000'};
  font-family: 'Poppins_600SemiBold';
  align-self: flex-start;
  font-size: ${({size}) => size || 18}px;
`

export const BackgroundColor = styled(View)<{color: string}>`
  background-color: ${({color}) => color};
  flex: auto;
  padding: 8px 16px;
`