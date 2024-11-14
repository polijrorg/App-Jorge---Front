import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(TouchableOpacity)`
    flex: 1;
    flex-direction: column;
    justify-content: top;
    gap: 16px;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
`;

export const ModalContent = styled.View`
    width: 90%;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 10px;
    elevation: 5;
    justify-content: center;
`;

export const Title = styled.Text`
    font-size: 20px;
    margin-bottom: 10px;
    font-family: 'Poppins_500Medium';
`;

export const Description = styled.Text`
    font-size: 14px;
    color: black;
    margin-bottom: 20px;
    font-family: 'PoppinsRegular';
`;

export const Label = styled.Text`
    font-size: 14px;
    margin-bottom: 10px;
    font-family: 'Poppins_500Medium';
`;

export const CodeInputContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
`;

export const CodeInput = styled.TextInput`
    width: 40px;
    height: 50px;
    border-width: 1px;
    border-color: #ddd;
    border-radius: 5px;
    text-align: center;
    font-size: 18px;
`;

export const Line = styled(View)`
    height: 0px;
    width: 100%;
    border: 0.3px;
    border-color: lightblue;
    margin-bottom: 20px;
`