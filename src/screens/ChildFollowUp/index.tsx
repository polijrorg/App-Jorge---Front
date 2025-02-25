import * as S from './styles';
import React from 'react';
import AmbientCard from '@components/AmbientCard';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Seringa from '@assets/icons/Seringa.png';
import Graph from '@assets/icons/Graph.png';
import Trophy from '@assets/icons/Trophy.png';
import Bebe from '@assets/icons/Bebe.png';
import Mamadeira from '@assets/icons/Mamadeira.png';
import { useChildContext } from '@hooks/useChild';
import ChildrenHeader from '@components/ChildrenHeader';
import ChildCard from '@components/ChildCard';
import FollowUpCard from '@components/FollowUpCard';

const FollowUpScreen = ({ navigation }) => {
    const { activeChild: child } = useChildContext();

    return (
        <S.Wrapper>
            <ChildrenHeader />
            <S.Content>
                <View style={{ gap: 10, flexDirection: 'row', width: '100%', marginBottom: 8 }}>
                    <S.Button onPress={() => navigation.goBack()} >
                        <Ionicons name="arrow-back-outline" size={20} color="white" />
                    </S.Button >
                    <S.Title>Acompanhamento</S.Title>
                </View>

                <ChildCard
                    isEditable={false}
                    name={child.name || 'name'}
                    birthDate={child.nascimento || ''}
                    weight={child.peso || 'weight'}
                    height={child.altura || 'height'}
                    id={child.idchildren}
                    gender={child.gender}
                />

                <S.Line />
                
                <S.Title>Resumo</S.Title>
                <S.Description>
                    <S.GreenText>Desenvolvimento está dentro dos padrões esperados </S.GreenText>
                    para a idade. {child.name} está no 
                    <S.GreenText> percentil 50 </S.GreenText>
                    para peso e altura, o que indica que está crescendo de forma saudável e proporcional.
                </S.Description>
                <S.Line />
                
                <S.Title>Seus Ambientes</S.Title>
                <ScrollView horizontal contentContainerStyle={{ alignItems: 'flex-start', justifyContent: 'space-evenly', width:'100%' }} style={{ maxHeight:100 }}>
                    <AmbientCard image={Bebe} title={'Meus Filhos'} onPress={() => navigation.navigate('MyChildren')}/>
                    <AmbientCard image={Graph} title={'Curvas de\nCrescimento'} onPress={() => navigation.navigate('Curva')} />
                    <AmbientCard image={Seringa} title={'Carteira de\nVacinas'} onPress={() => navigation.navigate('Vacinas')} />
                    <AmbientCard image={Trophy} title={'Marcos de\nDesenv.'} onPress={() => navigation.navigate('Marcos')} />
                    <AmbientCard image={Mamadeira} title={'MedMama'} onPress={() => navigation.navigate('MedMama')} />
                </ScrollView>
            </S.Content>
        </S.Wrapper>
    )

};

export default FollowUpScreen;
