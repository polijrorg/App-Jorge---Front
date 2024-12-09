import { View, Image, TouchableOpacity } from "react-native";
import styled from "styled-components";

export const Wrapper = styled(View)`
    width: 100%;
    height: 72px;
    background-color: ${({theme}) => theme.colors.header};
    justify-content: center;
    align-items: center;
    
`;

export const Logo = styled(Image)`
    width: 25px;
    height: 25px;
    margin-top: 32px;
`