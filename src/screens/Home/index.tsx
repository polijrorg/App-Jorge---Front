import DefaultHeader from '@components/DefaultHeader';
import * as S from './styles';
import React, { useEffect } from 'react';
import AmbientCard from '@components/AmbientCard';
import { View, TouchableOpacity } from 'react-native';
import Bebe from '@assets/icons/Bebe.png';
import Seringa from '@assets/icons/Seringa.png';
import Graph from '@assets/icons/Graph.png';
import Trophy from '@assets/icons/Trophy.png';
import Mamadeira from '@assets/icons/Mamadeira.png';
import ReminderCard from '@components/ReminderCard';
import { useAuthContext } from '@hooks/useAuth';
import { useChildContext } from '@hooks/useChild';
import Child from '@interfaces/Child';
import ChildrenService from '@services/ChildrenService';

const HomeScreen = ({ navigation }) => {

    const { user } = useAuthContext();
    const { childList: children, setChildList } = useChildContext();

    const formatNames = (children?: Child[]) => {
        if (!children || children.length === 0) return 'Cadastre seus filhos em "Meus Filhos"!'
        const names = children?.map((c) => (c?.name?.split(' ')[0]));
        if (names.length === 1) return `${names[0]} precisa ter seus marcos atualizados!`;
        if (names.length === 2) return `${names[0]} e ${names[1]} precisam ter seus marcos atualizados!`
        else {
            const lastChild = names.pop();
            return `${names.join(', ')} e ${lastChild} precisam ter seus marcos atualizados!`;
        }
    }

    useEffect(() => {
      async function fetchChildren() {
        const response = await ChildrenService.readByParent(user.id);
        setChildList(response);
      }
      fetchChildren()
    }, [user.id])

    return (
        <S.Wrapper>
            <DefaultHeader />
            <S.Content>
                {user && <S.Title>Bem vindo de volta {user?.name?.split(' ')[0]}!</S.Title>}
                <S.Description>{formatNames(children)} </S.Description>
                <TouchableOpacity style={{ width: '100%' }}>
                    <S.BlueText>Conferir {'>'}</S.BlueText>
                </TouchableOpacity>
                <S.Line />
                
                <S.Title>Seus Ambientes</S.Title>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-evenly', width:'100%' }}>
                    <AmbientCard image={Bebe} title={'Meus Filhos'} onPress={() => navigation.navigate('MyChildren')}/>
                    <AmbientCard image={Graph} title={'Curvas de\nCrescimento'} onPress={() => navigation.navigate('Curva')} />
                    <AmbientCard image={Seringa} title={'Carteira de\nVacinas'} onPress={() => navigation.navigate('Vacinas')} />
                    <AmbientCard image={Trophy} title={'Marcos de\nDesenv.'} onPress={() => navigation.navigate('Marcos')} />
                    <AmbientCard image={Mamadeira} title={'MedMama'} onPress={() => navigation.navigate('MedMama')} />
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
