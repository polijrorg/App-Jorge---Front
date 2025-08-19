import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const Container = styled(View)`
  padding: 16px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  width: 90%;
  gap: 4px;
  border-radius: 8px;
  max-height: 200px;
`;

export const Fundo = styled(View)`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

export const Description = styled(Text)`
  color: #000;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  line-height: 24px;
  letter-spacing: 0.5px;
  font-family: "PoppinsRegular";
`;

export const Line = styled(View)`
  border: 0.5px solid lightgray;
  width: 100%;
  margin-bottom: 8px;
`;

export const ButtonContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 8px;
`;

export const Button = styled(TouchableOpacity)<{ isCancel?: boolean }>`
  flex: 1;
  padding: 10px;
  margin: 4px;
  border-radius: 8px;
  align-items: center;
  background-color: ${({ isCancel }) => (isCancel ? "#ccc" : "#7BB0CC")};
`;

export const Title = styled(Text)<{ selected: boolean }>`
  color: ${({ selected }) => (selected ? "#FFF" : "rgba(0, 0, 0, 0.5)")};
  text-align: center;
  font-size: 14px;
  font-style: normal;
  line-height: 24px;
  letter-spacing: 0.5px;
  font-family: "Poppins_600SemiBold";
`;
