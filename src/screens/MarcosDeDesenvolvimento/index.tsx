import DefaultHeader from '@components/DefaultHeader';
import * as S from './styles';
import React, { useState } from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MarcosCard from '@components/MarcosCard';
import AgeModal from '@components/AgeModal';
import MarcosFilterButton from '@components/MarcosFilterButton';
import AreaModal from '@components/AreaModal';

const MarcosScreen = ({ navigation }) => {

    const [ageModal, setAgeModal] = useState<boolean>(false);
    const [selectedAge, setSelectedAge] = useState<number>(4);

    const [areaModal, setAreaModal] = useState<boolean>(false);
    const [selectedArea, setSelectedArea] = useState<string>('social');

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

    function determineColor2(a: string) {
        switch (a.toLowerCase()) {
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

    const marcos = [
        { text: "Marco 1: esse aqui é Social e 4 meses", area: "social", age: 4 },
        { text: "Marco 2: esse aqui é Social e 6 meses", area: "social", age: 6 },
        { text: "Marco 3: esse aqui é Social e 8 meses", area: "social", age: 8 },
        { text: "Marco 4: esse aqui é Linguagem e 4 meses", area: "linguagem", age: 4 },
        { text: "Marco 5: esse aqui é Linguagem e 6 meses", area: "linguagem", age: 6 },
        { text: "Marco 6: esse aqui é Linguagem e 8 meses", area: "linguagem", age: 8 },
        { text: "Marco 7: esse aqui é Cognitivo e 4 meses", area: "cognitivo", age: 4 },
        { text: "Marco 8: esse aqui é Cognitivo e 6 meses", area: "cognitivo", age: 6 },
        { text: "Marco 9: esse aqui é Cognitivo e 8 meses", area: "cognitivo", age: 8 },
        { text: "Marco 10: esse aqui é Motor e 4 meses", area: "motor", age: 4 },
        { text: "Marco 11: esse aqui é Motor e 6 meses", area: "motor", age: 6 },
        { text: "Marco 12: esse aqui é Motor e 8 meses", area: "motor", age: 8 },
        { text: "Marco 13: esse aqui é Quando Prevenir Cedo e 4 meses", area: "quando prevenir cedo", age: 4 },
        { text: "Marco 14: esse aqui é Quando Prevenir Cedo e 6 meses", area: "quando prevenir cedo", age: 6 },
        { text: "Marco 15: esse aqui é Quando Prevenir Cedo e 8 meses", area: "quando prevenir cedo", age: 8 }
    ];    

    const filteredMarcos = marcos.filter(m => 
        m.age === selectedAge && m.area.toLowerCase() === selectedArea.toLowerCase()
    );

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
                
                {filteredMarcos.map((m, index) => (
                    <MarcosCard key={index} image={undefined} text={m.text} color={determineColor2(m.area)} />
                ))}
            </S.Content>

            <AgeModal onClose={(a: number) => {setAgeModal(false); setSelectedAge(a)}} visible={ageModal} selectedAge={selectedAge} />
            <AreaModal onClose={(a: string) => {setAreaModal(false); setSelectedArea(a)}} visible={areaModal} selectedArea={selectedArea} />

        </S.Wrapper>
    );
};

export default MarcosScreen;
