import { TouchableOpacity, ScrollView } from 'react-native';
import styled from 'styled-components/native';

export const Fundo = styled(TouchableOpacity)`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
`;

export const Container = styled.View`
    width: 90%;
    max-height: 80%;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    elevation: 5;
    flex: 1;
`;

export const Scroll = styled(ScrollView)`
    flex: 1;
    padding: 20px;
`

export const Title = styled.Text`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
`;

export const SectionTitle = styled.Text`
    font-size: 16px;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 5px;
`;

export const Text = styled.Text`
    font-size: 14px;
    font-weight: light;
    margin-top: 10px;
    color: #4E92B7;
    margin-bottom: 24px;
`;

export const Description = styled.Text`
    font-size: 14px;
    line-height: 20px;
    margin-top: 5px;
`;
