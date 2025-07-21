import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const Wrapper = styled(SafeAreaView)`
  flex: 1;
  align-items: center;
  justify-content: top;
  background: ${({ theme }) => theme.colors.background };
`;

export const Container = styled(View)`
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 20px;
`

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

export const Description = styled(Text)<{ color?: string }>`
  color: ${({color}) => color || '#000'};
  font-family: 'PoppinsRegular';
  font-size: 12px;
  flex: 1;
  width: 20%;
  text-align: center;
`

export const EmptyText = styled(Text)<{ color?: string }>`
  color: ${({color}) => color || '#000'};
  font-family: 'PoppinsRegular';
  font-size: 12px;
  flex: 1;
  width: 100%;
  text-align: center;
`

export const Line = styled(View)`
  height: 0px;
  width: 100%;
  border: 0.3px;
  border-color: lightblue;
  margin-bottom: 10px;
  margin-top: 10px;
`