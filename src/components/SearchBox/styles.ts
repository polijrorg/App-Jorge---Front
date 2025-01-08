import styled from 'styled-components/native';
import { TextInput as RNTextInput, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

export const SearchBarWrapper = styled(View)`
    position: relative;
    width: 100%;
`;

export const SearchBar = styled(View)`
    flex-direction: row;
    align-items: center;
    padding: 4px 16px;
    border: 1px solid #ccc;
    border-radius: 100px;
    background-color: #fff;
`;

export const TextInput = styled(RNTextInput)`
    flex: 1;
    margin-right: 8px;
    font-size: 16px;
    height: 40px;
`;

export const DropdownContainer = styled(View)`
  position: absolute;
  left: 5%;
  flex: 1;
  width: 90%;
  top: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top-width: 0;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  max-height: 200px;
  z-index: 2;
`;

export const ItemText = styled(Text)`
    font-size: 16px;
    color: #000;
    padding: 10px;
    border-bottom-width: 1px;
    border-bottom-color: #eee;
`;

export const EmptyText = styled(Text)`
    padding: 12px;
    font-size: 16px;
    color: #999;
    text-align: center;
`;

