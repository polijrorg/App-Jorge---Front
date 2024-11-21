import styled from 'styled-components/native';
import { View, Text, Image } from 'react-native';

export const Card = styled(View)`
    flex-direction: row;
    align-items: center;
    padding: 16px;
    border-radius: 8px;
    background-color: #ffffff;
    shadow-color: #000;
    shadow-offset: 0px 4px;
    shadow-opacity: 0.1;
    shadow-radius: 8px;
    elevation: 3;
`;

export const AvatarContainer = styled(View)`
    margin-right: 8px;
`;

export const Avatar = styled(Image)`
    width: 64px;
    height: 64px;
    border-radius: 32px;
`;

export const InfoContainer = styled(View)`
    flex: 1;
`;

export const Name = styled(Text)`
    font-size: 16px;
    color: #000;
    font-family: 'Poppins_600SemiBold';
`;

export const Details = styled(Text)`
    font-size: 12px;
    color: #000;
    font-family: 'PoppinsRegular';
`;

export const ProgressContainer = styled(View)`
    flex-direction: row;
    align-items: center;
    margin-top: 4px;
    gap: 4px;
`;

export const ProgressLabel = styled(Text)`
    font-size: 12px;
    color: #000;
    margin-bottom: 2px;
    font-family: 'PoppinsRegular';
`;

export const ProgressBarBackground = styled(View)`
    height: 8px;
    width: 80px;
    background-color: #e0e0e0;
    border-radius: 4px;
    overflow: hidden;
`;

export const ProgressBarFill = styled(View)`
    height: 100%;
    border-radius: 4px;
`;

export const HighlightYellow = styled(Text)`
    color: #F5CD2F;
`

export const HighlightGreen = styled(Text)`
    color: #4CAF50;
`
