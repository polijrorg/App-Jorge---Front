import styled from 'styled-components/native';
import { TextInput, View } from 'react-native';

export const InputContainer = styled(View)`
  width: 80%;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 8px
`;

export const Input = styled(TextInput)`
  width: 40px;
  height: 40px;
  background-color: #e1e1e1;
  border-radius: 8px;
  font-size: 20px;
  text-align: center;
`;