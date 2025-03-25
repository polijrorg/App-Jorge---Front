import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const Wrapper = styled(ScrollView).attrs({
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    padding: 24,
  },
})`
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 100%;
`;


export const Logo = styled.Image`
    width: 50px;
    height: 50px;
`;

export const BlackText = styled(Text)`
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    letter-spacing: 0.5px;
    font-family: "Poppins_600SemiBold";
`

export const BlueText = styled(BlackText)`
    color: #4E92B7;
`;

export const TitleText = styled(Text)`
    color: #000;
    font-feature-settings: 'liga' off, 'clig' off;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    letter-spacing: 0.5px;
    font-family: "Poppins_600SemiBold";
`

export const Line = styled(View)`
    height: 0px;
    width: 100%;
    border: 0.7px;
    border-color: black;
`

export const Password = styled(View)`
    width: 100%;

`

export const Checkbox = styled(TouchableOpacity)`
    display: flex;
    width: 24px;
    height: 24px;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    border: solid 1px lightgray;
`

export const Cross = styled(Text)`
    color: white;
    font-feature-settings: 'liga' off, 'clig' off;
    font-size: 12px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.5px;
    font-family: "PoppinsBlack";
`