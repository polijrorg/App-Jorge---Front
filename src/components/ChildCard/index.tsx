import React, { useEffect, useState } from 'react';
import * as S from './styles';
import { TouchableOpacity, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ChildrenService from '@services/ChildrenService';
import { useChildContext } from '@hooks/useChild';
import VaccineService from '@services/VaccineService';

interface ChildCardProps {
    name: string;
    birthDate: string;
    weight: string;
    height: string;
    id: string;
    gender: string;
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
    gender,
    onPress,
    onPressMain,
    isEditable = true
}) => {

    const [age, setAge] = useState<{years: number, months: number}>(null);
    const [marcosDevelopment, setMarcosDevelopment] = useState<number>(50);
    const [vaccineDevelopment, setVaccineDevelopment] = useState<number>(50);
    const { activeChild } = useChildContext();

    useEffect(() => {
        if (birthDate) setAge(findAge(birthDate));
      }, [birthDate])

    function findAge(birthDate: string): { years: number, months: number } {
        if (birthDate == null) return {years: 0, months: 0};
        const [day, month, year] = birthDate?.split('/').map(Number);
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
        const marcosResponse = await ChildrenService.development(id);
        setMarcosDevelopment(Number(marcosResponse.developmentPercentage));
        console.log('Desenvolvimento dos marcos calculado:', marcosResponse.developmentPercentage);
        const vaccinesResponse = await VaccineService.development(id);
        setVaccineDevelopment(Number(vaccinesResponse.developmentPercentage));
        console.log('Desenvolvimento dos marcos calculado:', vaccinesResponse.developmentPercentage);
      }
      calculateDevelopment();
    }, [activeChild])

    function determineAvatar() {
      if (age?.years < 2) return require('@assets/icons/baby.png');
      return (gender === 'feminino') ? require('@assets/icons/girl.png') : require('@assets/icons/boy.png');
    }
    
    return (
        <S.Card onPress={onPressMain}>
            <S.AvatarContainer>
                <S.Avatar source={determineAvatar()} />
            </S.AvatarContainer>
            <S.InfoContainer>
                <S.Name>{name}</S.Name>
                <S.Details>
                  {formatAge(age)} - <S.HighlightGreen>{weight}</S.HighlightGreen> - <S.HighlightYellow>{height}</S.HighlightYellow>
                </S.Details>
                <S.ProgressContainer>
                    <S.ProgressLabel>Desenvolvimento</S.ProgressLabel>
                    <ProgressBar percentage={marcosDevelopment} color="#4CAF50" />
                </S.ProgressContainer>
                <S.ProgressContainer>
                    <S.ProgressLabel>Vacinas</S.ProgressLabel>
                    <ProgressBar percentage={vaccineDevelopment} color="#F5CD2F" />
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
