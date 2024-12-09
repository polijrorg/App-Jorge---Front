import styled from 'styled-components/native';

export const Container = styled.View`
    flex-direction: row;
    background-color: #f9f9f9;
    border-radius: 10px;
    border: 0.7px lightblue;
`;

export const LeftSection = styled.View`
    background-color: #7CB1CD;
    padding: 5px 15px;
    border-top-left-radius: 10px;
    border-bottom-right-radius: 10px;
    justify-content: center;
    max-height: 15%;
`;

export const MonthText = styled.Text`
    color: white;
    font-weight: bold;
    font-size: 16px;
`;

export const Content = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
`;

export const Card = styled.View`
    flex: 1;
    align-items: center;
    padding: 10px;
`;

export const ImageWrapper = styled.View`
    background-color: #ffeef2;
    padding: 10px;
    border-radius: 50px;
    margin-bottom: 10px;
`;

export const ProfileImage = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 25px;
`;

export const TextWrapper = styled.View`
    align-items: center;
`;

export const NameText = styled.Text`
    font-family: 'Poppins_600SemiBold';
    font-size: 12px;
    margin-bottom: 5px;
`;

export const HighlightText = styled.Text`
    color: #4D91B6;
    font-family: 'Poppins_600SemiBold';
    font-size: 10px;
    text-align: center;
`;

export const NormalText = styled.Text`
    color: #555;
    font-size: 10px;
    text-align: center;
    font-family: 'PoppinsRegular';
`;

export const Separator = styled.View`
    width: 1px;
    height: 100%;
    background-color: #e0e0e0;
    margin: 0 10px;
`;
