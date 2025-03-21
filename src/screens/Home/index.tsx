import DefaultHeader from '@components/DefaultHeader';
import * as S from './styles';
import React, { useEffect } from 'react';
import AmbientCard from '@components/AmbientCard';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import Seringa from '@assets/icons/Seringa.png';
import Graph from '@assets/icons/Graph.png';
import Trophy from '@assets/icons/Trophy.png';
import Mamadeira from '@assets/icons/Mamadeira.png';
import { useAuthContext } from '@hooks/useAuth';
import { useChildContext } from '@hooks/useChild';
import Child from '@interfaces/Child';
import ChildrenService from '@services/ChildrenService';
import AddChildButton from '@components/AddChildButton';
import ChildCard from '@components/ChildCard';

const HomeScreen = ({ navigation }) => {

    const { user } = useAuthContext();
    const { childList: children, setChildList, setActiveChild } = useChildContext();

    const formatNames = (children?: Child[]) => {
        if (!children || children.length === 0) return 'Complete seus dados em Configurações!'
        const names = children?.map((c) => (c?.name?.split(' ')[0]));
        if (names.length === 1) return `${names[0]} precisa ter seus marcos atualizados!`;
        if (names.length === 2) return `${names[0]} e ${names[1]} precisam ter seus marcos atualizados!`
        else {
            const lastChild = names.pop();
            return `${names.join(', ')} e ${lastChild} precisam ter seus marcos atualizados!`;
        }
    }

    async function handlePress(data: Child) {
        setActiveChild(data);
        navigation.navigate('EditChildren');
    }

    async function handlePressMain(data: Child) {
        setActiveChild(data);
        navigation.navigate('FollowUp');
    }

    function renderDescription() {
      if (Object.entries(user)
        .filter(([key]) => key !== "password")
        .some(([, value]) => !value)
      ) {
        return 'Complete seus dados em Configurações!';
      }
      console.log(user);
      return formatNames();
    }

    useEffect(() => {
      async function fetchChildren() {
        const response = await ChildrenService.readByParent(user?.id);
        setChildList(response);
      }
      fetchChildren()
    }, [user?.id])

    return (
        <S.Wrapper>
            <DefaultHeader />
            <S.Content>
                {user && <S.Title>Seja bem vindo(a) {user?.name?.split(' ')[0]}!</S.Title>}
                {/* <S.Description>{formatNames(children)} </S.Description> */}
                <S.Description>{renderDescription()}</S.Description>
                {/* <TouchableOpacity style={{ width: '100%' }} onPress={() => navigation.navigate('Main', { screen: 'MyChildren' })}>
                    <S.BlueText>Conferir {'>'}</S.BlueText>
                </TouchableOpacity> */}
                <S.Line />
                
                <S.Title>Ferramentas</S.Title>
                <ScrollView horizontal contentContainerStyle={{ alignItems: 'flex-start', justifyContent: 'space-evenly', width:'100%' }} style={{ maxHeight:100 }}>
                    <AmbientCard image={Graph} title={'Curvas de\nCrescimento'} onPress={() => navigation.navigate('Curva')} />
                    <AmbientCard image={Seringa} title={'Carteira de\nVacinas'} onPress={() => navigation.navigate('Vacinas')} />
                    <AmbientCard image={Trophy} title={'Marcos de\nDesenv.'} onPress={() => navigation.navigate('Marcos')} />
                    <AmbientCard image={Mamadeira} title={'MedMama'} onPress={() => navigation.navigate('MedMama')} />
                </ScrollView>
                <S.Line />

                <S.Title>Suas Crianças</S.Title>                
                {(children && children.length > 0) &&
                  children.map((c) => (
                    <ChildCard
                        key={c.idchildren}
                        onPress={() => handlePress(c)}
                        onPressMain={() => handlePressMain(c)}
                        name={c.name.split(' ')[0]}
                        birthDate={c.nascimento}
                        weight={`${c.peso}kg`}
                        height={`${c.altura}cm`}
                        id={`${c.idchildren}`}
                        gender={c.gender}
                    />
                ))}

                <AddChildButton onPress={() => navigation.navigate('RegisterChildren')}/>

                {/* <S.Title>Lembretes</S.Title> */}
                {/* <ReminderCard /> */}
                
                <S.Line />
                <View style={{ alignItems: 'center', width: '100%' }}>
                    <S.Description width={1} size={13}>Dúvidas, críticas ou sugestões?</S.Description>
                    <TouchableOpacity onPress={() => navigation.navigate('Main', { screen: 'Feedback' })}>
                        <S.BlueText size={13}>Nos ajude a melhorar!</S.BlueText>
                    </TouchableOpacity>
                </View>
            </S.Content>
        </S.Wrapper>
    )

};

export default HomeScreen;
