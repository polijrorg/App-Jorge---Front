import DefaultHeader from '@components/DefaultHeader';
import * as S from './styles';
import React from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ChildCard from '@components/ChildCard';
import Bebe from '@assets/icons/Bebe.png'
import AddChildButton from '@components/AddChildButton';
import Child from '@interfaces/Child';
import { useChildContext } from '@hooks/useChild';

const MyChildrenScreen = ({ navigation }) => {

    const { childList: children, setActiveChild } = useChildContext();

    async function handlePress(data: Child) {
        setActiveChild(data);
        navigation.navigate('EditChildren');
    }

    async function handlePressMain(data: Child) {
        setActiveChild(data);
        navigation.navigate('FollowUp');
    }
    
    return (
        <S.Wrapper>
            <DefaultHeader />
            <S.Content>
                <View style={{ gap: 10, flexDirection: 'row', width: '100%' }}>
                    <S.Button onPress={() => navigation.goBack()} >
                        <Ionicons name="arrow-back-outline" size={20} color="white" />
                    </S.Button >
                    <S.Title>Suas Crianças</S.Title>
                </View>
                <S.Line />
                
                {children.map((c) => (
                    <ChildCard
                        key={c.idchildren}
                        onPress={() => handlePress(c)}
                        onPressMain={() => handlePressMain(c)}
                        name={c.name.split(' ')[0]}
                        birthDate={c.nascimento}
                        weight={`${c.peso}kg`}
                        height={`${c.altura}cm`}
                        id={`${c.idchildren}`}
                        vaccinePercentage={50}
                        avatar={Bebe}
                    />
                ))}

                <AddChildButton onPress={() => navigation.navigate('RegisterChildren')}/>

                <View style={{ marginTop: 50 }}/>
            </S.Content>
        </S.Wrapper>
    )

};

export default MyChildrenScreen;
