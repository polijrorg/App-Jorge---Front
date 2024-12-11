import DefaultHeader from '@components/DefaultHeader';
import * as S from './styles';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AmbientCard from '@components/AmbientCard';
import { View, TouchableOpacity } from 'react-native';

import Bebe from '@assets/icons/Bebe.png';
import Seringa from '@assets/icons/Seringa.png';
import Graph from '@assets/icons/Graph.png';
import Trophy from '@assets/icons/Trophy.png';
import Mamadeira from '@assets/icons/Mamadeira.png';
import ReminderCard from '@components/ReminderCard';

const HomeScreen = ({ navigation }) => {

    const userName = 'Vinícius';

    const children = [
        'Rafaela',
        'Carlos',
    ]

    const formatNames = (names: string[]) => {
        if (names.length === 1) return `${names[0]} precisa ter seus marcos atualizados!`;
        if (names.length === 2) return `${names[0]} e ${names[1]} precisam ter seus marcos atualizados!`
        else {
            const lastChild = names.pop();
            return `${names.join(', ')} e ${lastChild} precisam ter seus marcos atualizados!`;
        }

    }

    return (
        <S.Wrapper>
            <DefaultHeader />
            <S.Content>
                <S.Title>Bem vindo de volta {userName}!</S.Title>
                <S.Description>{formatNames(children)} </S.Description>
                <TouchableOpacity style={{ width: '100%' }}>
                    <S.BlueText>Conferir {'>'}</S.BlueText>
                </TouchableOpacity>
                <S.Line />
                
                <S.Title>Seus Ambientes</S.Title>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                    <AmbientCard image={Bebe} title={'Meus Filhos'} onPress={() => 1} />
                    <AmbientCard image={Graph} title={'Curvas de\nCrescimento'} onPress={() => 1} />
                    <AmbientCard image={Seringa} title={'Carteira de\nVacinas'} onPress={() => 1} />
                    <AmbientCard image={Trophy} title={'Marcos de\nDesenv.'} onPress={() => navigation.navigate('Marcos')} />
                    <AmbientCard image={Mamadeira} title={'MedMama'} onPress={() => 1} />
                </View>
                <S.Line />

                <S.Title>Lembretes</S.Title>
                <ReminderCard />
                
                <View style={{ flexDirection: 'row' }}>
                    <S.Description width={1} size={12} >Dúvidas, críticas ou sugestões? </S.Description>
                    <TouchableOpacity>
                        <S.BlueText size={12}>Nos ajude também!</S.BlueText>
                    </TouchableOpacity>
                </View>
            </S.Content>
        </S.Wrapper>
    )

};

export default HomeScreen;
