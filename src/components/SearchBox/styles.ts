import styled from 'styled-components/native';
import { TextInput as RNTextInput, View, Text } from 'react-native';

export const Container = styled(View)`
  flex: 1;
  padding: 16px;
  min-width: 100%;
`;

export const SearchBar = styled(View)`
  flex-direction: row;
  align-items: center;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 20px;
  background-color: #fff;
`;

export const TextInput = styled(RNTextInput)`
  flex: 1;
  margin-right: 8px;
  font-size: 16px;
`;

export const Dropdown = styled(View)`
  margin-top: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  max-height: 150px; /* Limite de altura para a lista */
  overflow: hidden;
`;

export const ItemText = styled(Text)`
  padding: 12px;
  font-size: 16px;
  color: #000;
`;

export const EmptyText = styled(Text)`
  padding: 12px;
  font-size: 16px;
  color: #999;
  text-align: center;
`;
