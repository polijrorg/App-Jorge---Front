import { View, Text } from "react-native";
import styled from "styled-components";

export const Container = styled(View)`
  width: 100%;
  padding: 16px;
  background-color: ${({theme}) => theme.colors.ambientCard};
  border-radius: 16px;
`;

export const Description = styled(Text)`
  font-family: PoppinsRegular;
  text-align: center;
`;
