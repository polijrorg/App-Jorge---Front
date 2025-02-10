import DefaultHeader from '@components/DefaultHeader';
import * as S from './styles';
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FeedbackCard from '@components/FeedbackCard';
import FeedbackService from '@services/FeedbackService';
import { useAuthContext } from '@hooks/useAuth';

const FeedbackScreen = ({ navigation }) => {

    const values = Array.from({ length: 10 }, (a, i) => i + 1);
    const [rating, setRating] = useState<number>(10);
    const [feedbackSent, setFeedbackSent] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const { user } = useAuthContext();

    function formatCategory(category: string) {
      return category.toUpperCase().replace(' ', '_');
    }
    
    async function onSubmit(category: string, message: string) {
      if (category) {
        setFeedbackSent(true);
        setError('');
        await FeedbackService.create({
          email: user.email,
          category: formatCategory(category),
          message: message,
          rating: rating,
        }, user.id);
      } else {
        setError('Selecione uma category para deixar seu feedback!')
      }
    }

    return (
        <S.Wrapper>
            <DefaultHeader />
            <S.Content>
                <View style={{ gap: 10, flexDirection: 'row', width: '100%' }}>
                    <S.Button onPress={() => navigation.goBack()} >
                        <Ionicons name="arrow-back-outline" size={20} color="white" />
                    </S.Button >
                    <S.Title>Feedbacks</S.Title>
                </View>
                <FeedbackCard onSubmit={onSubmit}/>
                <S.Line />
                
                <S.Title>Avalie nossos serviços</S.Title>
                <View style={{ gap: 10, flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
                    {values.map((value) => (
                        <TouchableOpacity
                            key={value}
                            style={{
                                backgroundColor: value === rating ? '#71AAC9' : '#E6E6E6',
                                minWidth: 22,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 100
                            }}
                            onPress={() => setRating(value)}
                        >
                            <S.Number>{value}</S.Number>
                        </TouchableOpacity>
                    ))}
                </View>
                {feedbackSent && <S.Description>Feedback enviado com sucesso!</S.Description>}
                {error && <S.Error>{error}</S.Error>}
            </S.Content>
        </S.Wrapper>
    )

};

export default FeedbackScreen;
