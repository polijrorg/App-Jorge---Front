import styled from 'styled-components/native';
import { View, Image, Text, TouchableOpacity } from 'react-native';

interface Props{
  isOpen?: boolean;
}

export const Container = styled(View)`
  width: 200px;
  min-height: 30px;
  padding: 4px;
  padding-left: 8px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background };
  border: 1px lightblue;
  elevation: 2;
  justify-content: center;
`;

export const SelectedOptionButton = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ChevronDown = styled(Image)<Props>`
  width: 16px;
  height: 16px;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')}; //rotate(180deg)
`;

export const SelectedOption = styled(Text)`
  font-size: 14px;
  color: #333;
  font-family: 'Poppins_500Medium';
`;

export const OptionsContainer = styled(View)`
  margin-top: 8px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.divider };
`;

export const Option = styled(Text)`
  padding: 8px;
  font-size: 14px;
  color: #333;
  background-color: ${({ theme }) => theme.colors.background};
  font-family: 'PoppinsRegular';
`;
