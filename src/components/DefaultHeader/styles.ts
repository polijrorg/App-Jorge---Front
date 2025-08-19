import { View, Image, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const Wrapper = styled(View)`
    width: 100%;
    background-color: ${({theme}) => theme.colors.header};
    justify-content: center;
    align-items: center;
    
`;

export const Logo = styled(Image)`
    width: 25px;
    height: 25px;
    margin: 16px;
`