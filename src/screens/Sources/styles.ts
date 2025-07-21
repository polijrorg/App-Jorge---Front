import { Text, TouchableOpacity, View, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import styled from "styled-components/native"

export const Wrapper = styled(SafeAreaView)`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.background || "#fff"};
`

export const Content = styled(ScrollView).attrs(() => ({
  contentContainerStyle: {
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 16,
    paddingBottom: 100,
  },
}))`
  flex: 1;
  background: ${({ theme }) => theme.colors.background || "#fff"};
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

export const ContentCard = styled(View)`
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 16px;
  border: 0.5px lightblue;
`

export const Paragraph = styled(Text)`
  color: #333;
  font-family: 'PoppinsRegular';
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 16px;
  text-align: justify;
`

export const SectionTitle = styled(Text)`
  color: #000;
  font-family: 'Poppins_600SemiBold';
  font-size: 16px;
  margin-bottom: 16px;
`

export const SourceItem = styled(View)`
  flex-direction: row;
  margin-bottom: 20px;
`

export const BulletPoint = styled(Text)`
  color: #000;
  font-size: 16px;
  margin-right: 8px;
  line-height: 22px;
`

export const SourceTitle = styled(Text)`
  color: #000;
  font-family: 'Poppins_600SemiBold';
  font-size: 14px;
  margin-bottom: 4px;
`

export const SourceDescription = styled(Text)`
  color: #333;
  font-family: 'PoppinsRegular';
  font-size: 13px;
  line-height: 20px;
  margin-bottom: 4px;
  text-align: justify;
`

export const LinkButton = styled(TouchableOpacity)`
  margin-bottom: 8px;
`

export const LinkText = styled(Text)`
  color: ${({ theme }) => theme.colors.textHighlight || "#2980b9"};
  font-family: 'PoppinsRegular';
  font-size: 13px;
  text-decoration: underline;
  line-height: 20px;
`

export const MenuCard = styled(TouchableOpacity)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 16px;
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

