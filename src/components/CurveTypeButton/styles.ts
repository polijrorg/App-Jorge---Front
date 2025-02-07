import { TouchableOpacity, Text } from "react-native";
import styled from "styled-components";


export const Button = styled(TouchableOpacity)<{ selected: boolean }>`
  background-color: ${({ selected }) => (selected ? '#7BB0CC' : '#E5E5E5')};
  border-radius: 20px;
  padding: 8px;
  margin: 0px 4px;
  min-width: 20%;
  align-items: center;
`;

export const ButtonText = styled(Text)<{ selected: boolean, allCaps: boolean }>`
  color: ${({ selected }) => (selected ? '#FFF' : '#000')};
  font-size: 12px;
  font-family: 'PoppinsRegular';
  text-transform: ${({ allCaps }) => allCaps ? 'uppercase' : ''};
`;