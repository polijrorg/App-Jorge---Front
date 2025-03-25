import { Text, TouchableOpacity, View, ScrollView } from "react-native"
import styled from "styled-components/native"

export const Wrapper = styled(View)`
  height: 100%;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.background || "#fff"};
`

export const Content = styled(ScrollView).attrs(() => ({
  contentContainerStyle: {
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 16,
    gap: 16,
    paddingBottom: 100,
  },
}))`
  flex: 1;
  background: ${({ theme }) => theme.colors.background || "#fff"};
  width: 100%;
`

export const Line = styled(View)`
  border: 0.5px lightblue;
  height: 0px;
  width: 100%;
`

export const Title = styled(Text)`
  color: #000;
  font-family: 'Poppins_600SemiBold';
  font-size: 18px;
  margin-left: 10px;
`

export const Button = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.colors.header || "#2980b9"};
  border-radius: 100px;
  padding: 5px;
`

export const MenuCard = styled(TouchableOpacity)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  padding: 16px;
  border: 0.5px lightblue;
`

export const IconContainer = styled(View)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`

export const MenuText = styled(Text)`
  color: #000;
  font-family: 'Poppins_600SemiBold';
  font-size: 16px;
`

export const BottomNavigation = styled(View)`
  width: 100%;
  height: 60px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  border-top-width: 1px;
  border-top-color: #eee;
`

export const NavItem = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  padding: 5px;
`

export const NavText = styled(Text)`
  color: #666;
  font-family: 'PoppinsRegular';
  font-size: 10px;
  margin-top: 2px;
`

