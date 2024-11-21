import React from 'react';
import * as S from './styles';
import { TouchableOpacity, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface ChildCardProps {
    name: string;
    age: string;
    weight: string;
    height: string;
    developmentPercentage: number;
    vaccinePercentage: number;
    avatar: any;
}

const ProgressBar = ({ percentage, color }: { percentage: number; color: string }) => {
    return (
        <S.ProgressBarBackground>
            <S.ProgressBarFill style={{ width: `${percentage}%`, backgroundColor: color }} />
        </S.ProgressBarBackground>
    );
};

const ChildCard: React.FC<ChildCardProps> = ({
    name,
    age,
    weight,
    height,
    developmentPercentage,
    vaccinePercentage,
    avatar
}) => {
    return (
        <S.Card>
            <S.AvatarContainer>
                <S.Avatar source={avatar} />
            </S.AvatarContainer>
            <S.InfoContainer>
                <S.Name>{name}</S.Name>
                <S.Details>{age} - <S.HighlightGreen>{weight}</S.HighlightGreen> - <S.HighlightYellow>{height}</S.HighlightYellow></S.Details>
                <S.ProgressContainer>
                    <S.ProgressLabel>Desenvolvimento</S.ProgressLabel>
                    <ProgressBar percentage={developmentPercentage} color="#4CAF50" />
                </S.ProgressContainer>
                <S.ProgressContainer>
                    <S.ProgressLabel>Vacinas</S.ProgressLabel>
                    <ProgressBar percentage={vaccinePercentage} color="#F5CD2F" />
                </S.ProgressContainer>
            </S.InfoContainer>
            <View style={{ height: '100%' }}>
                <TouchableOpacity style={{ borderRadius: 100, padding: 5, backgroundColor: '#4D91B6' }}>
                    <MaterialIcons name="edit" size={16} color="white" />
                </TouchableOpacity>
            </View>
            
        </S.Card>
    );
};

export default ChildCard;
