import { TouchableOpacity } from "react-native"
import styled from "styled-components/native"

export const Backdrop = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`

export const Container = styled.View`
  width: 90%;
  max-height: 80%;
  background-color: white;
  border-radius: 20px;
  overflow: hidden;
`

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background-color: #3B7B9B;
`

export const Button = styled(TouchableOpacity)`
  background-color: ${({theme}) => theme.colors.header};
  border-radius: 100px;
  padding: 5px;
  height: 30px;
`

export const Title = styled.Text`
  color: '#000';
  font-size: 20px;
  font-family: "Poppins_600SemiBold";
  width: 80%;
  word-wrap: break-word;
`

export const Content = styled.View`
  padding: 16px;
`

export const Section = styled.View`
  margin-bottom: 16px;
`

export const SectionTitle = styled.Text`
  font-size: 14px;
  color: #000;
  margin-bottom: 8px;
  font-family: "Poppins_600SemiBold";
`

export const SectionText = styled.Text`
  font-size: 12px;
  color: #333;
  font-family: 'PoppinsRegular';
`

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
  border-top-width: 1px;
  border-top-color: #E5E5E5;
`

interface StatusButtonProps {
  status: "TOMOU" | "VAI_TOMAR" | "NAO_VAI_TOMAR"
}

export const StatusButton = styled.TouchableOpacity<StatusButtonProps>`
  flex: 1;
  margin: 0 4px;
  padding: 12px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => {
    switch (props.status) {
      case "TOMOU":
        return "#B0E0BB"
      case "VAI_TOMAR":
        return "#DBB68F"
      case "NAO_VAI_TOMAR":
        return "#D08F77"
      default:
        return "#E5E5E5"
    }
  }};
`

export const ButtonText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #000;
  opacity: 0.5;
  font-family: "Poppins_600SemiBold";
  text-align: center;
`

