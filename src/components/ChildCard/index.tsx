import React, { useEffect, useState } from 'react';
import * as S from './styles';
import { TouchableOpacity, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ChildrenService from '@services/ChildrenService';
import { useChildContext } from '@hooks/useChild';

interface ChildCardProps {
    name: string;
    birthDate: string;
    weight: string;
    height: string;
    id: string;
    vaccinePercentage: number;
    avatar: any;
    onPress?: (a: any) => void;
    isEditable?: boolean;
    onPressMain?: (a: any) => void;
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
    birthDate,
    weight,
    height,
    id,
    vaccinePercentage,
    avatar,
    onPress,
    onPressMain,
    isEditable = true
}) => {

    const [age, setAge] = useState<{years: number, months: number}>(null);
    const [development, setDevelopment] = useState<number>(50);
    const { activeChild } = useChildContext();

    useEffect(() => {
        if (birthDate) setAge(findAge(birthDate));
      }, [birthDate])

    function findAge(birthDate: string): { years: number, months: number } {
        if (birthDate == null) return {years: 0, months: 0};
        const [day, month, year] = birthDate.split('-').map(Number);
        const today = new Date();
        let years = today.getFullYear() - year;
        let months = today.getMonth() - month + 1;
        
        if (months < 0) {
            years--;
            months += 12;
        }
        
        if (today.getDate() < day) {
            months--;
        }
        return { years, months };
    }

    function formatAge(age: {months: number, years: number}) {
        const years = age && age.years != 0 ? `${age.years}a` : '';
        const months = age && age.months != 0 ? `${age.months}m` : '';
        if (!age || !age.years && !age.months) return '<1m';
        return [years, months].filter(Boolean).join(' ');
    }

    useEffect(() => {
      async function calculateDevelopment() {
        const response = await ChildrenService.development(id);
        setDevelopment(Number(response.developmentPercentage));
        console.log('calculado', response.developmentPercentage);
      }
      calculateDevelopment();
    }, [activeChild])
    
    return (
        <S.Card onPress={onPressMain}>
            <S.AvatarContainer>
                <S.Avatar source={avatar} />
            </S.AvatarContainer>
            <S.InfoContainer>
                <S.Name>{name}</S.Name>
                <S.Details>{formatAge(age)} - <S.HighlightGreen>{weight}</S.HighlightGreen> - <S.HighlightYellow>{height}</S.HighlightYellow></S.Details>
                <S.ProgressContainer>
                    <S.ProgressLabel>Desenvolvimento</S.ProgressLabel>
                    <ProgressBar percentage={development || 0} color="#4CAF50" />
                </S.ProgressContainer>
                <S.ProgressContainer>
                    <S.ProgressLabel>Vacinas</S.ProgressLabel>
                    <ProgressBar percentage={vaccinePercentage} color="#F5CD2F" />
                </S.ProgressContainer>
            </S.InfoContainer>

            {isEditable &&
              <View style={{ height: '100%' }}>
                  <TouchableOpacity onPress={onPress} style={{ borderRadius: 100, padding: 5, backgroundColor: '#4D91B6' }}>
                      <MaterialIcons name="edit" size={16} color="white" />
                  </TouchableOpacity>
              </View>
            }

        </S.Card>
    );
};

export default ChildCard;
