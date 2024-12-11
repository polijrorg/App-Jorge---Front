import DefaultHeader from '@components/DefaultHeader';
import * as S from './styles';
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MarcosCard from '@components/MarcosCard';
import AgeModal from '@components/AgeModal';
import MarcosFilterButton from '@components/MarcosFilterButton';
import AreaModal from '@components/AreaModal';

const MarcosScreen = ({ navigation }) => {

    const [name, setName] = useState<string>('');
    const [height, setHeight] = useState<string>('');
    const [birthDate, setBirthDate] = useState<Date>(null);
    const [gender, setGender] = useState<string>(null);
    const [premature, setPremature] = useState<string>(null);

    const [ageModal, setAgeModal] = useState<boolean>(false);
    const [selectedAge, setSelectedAge] = useState<number>(4);

    const [areaModal, setAreaModal] = useState<boolean>(false);
    const [selectedArea, setSelectedArea] = useState<string>('Social');

    function determineColor() {
        switch (selectedArea.toLowerCase()) {
            case 'social':
                return 1;
            case 'linguagem':
                return 2;
            case 'cognitivo':
                return 3;
            case 'motor':
                return 4;
            case 'quando prevenir cedo':
                return 5;
        }
    }

    return (
        <S.Wrapper>
            <DefaultHeader />
            <S.Content >
                <View style={{ gap: 10, flexDirection: 'row', width: '100%' }}>
                    <S.Button onPress={() => navigation.goBack()} >
                        <Ionicons name="arrow-back-outline" size={20} color="white" />
                    </S.Button >
                    <S.Title>Marcos de Desenvolvimento</S.Title>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                    <MarcosFilterButton title={`${selectedAge} meses`} onPress={() => setAgeModal(true)} />
                    <MarcosFilterButton title={selectedArea} onPress={() => setAreaModal(true)} color={determineColor()} />
                </View>
                
                <MarcosCard image={undefined} text={'Até a pé nós iremos para o que der e vier mas o certo é que nós estaremos com o grêmio onde o grêmio estiver'} />

            </S.Content>

            <AgeModal onClose={(a: number) => {setAgeModal(false), setSelectedAge(a)}} visible={ageModal} selectedAge={selectedAge} />
            <AreaModal onClose={(a: string) => {setAreaModal(false), setSelectedArea(a)}} visible={areaModal} selectedArea={selectedArea} />

        </S.Wrapper>
    )

};

export default MarcosScreen;
