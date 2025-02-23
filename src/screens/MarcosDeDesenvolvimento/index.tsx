import * as S from './styles';
import React, { useEffect, useState } from 'react';
import { FlatList, View, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MarcosCard from '@components/MarcosCard';
import AgeModal from '@components/AgeModal';
import MarcosFilterButton from '@components/MarcosFilterButton';
import AreaModal from '@components/AreaModal';
import ChildrenHeader from '@components/ChildrenHeader';
import { useChildContext } from '@hooks/useChild';
import NoChildrenWarning from '@components/NoChildrenWarning';
import MarcosService from '@services/MarcosService';
import MarcosImages from '@services/MarcosImages';
import TestImage from '@assets/images/marcos/1.png';

interface MarcosMerged {
  number: string,
  status: string,
  restricao: string,
  tipo: string,
  name: string,
  image: any,
}

const MarcosScreen = ({ navigation }) => {
    const [ageModal, setAgeModal] = useState<boolean>(false);
    const [selectedAge, setSelectedAge] = useState<string>('2 meses');
    const [areaModal, setAreaModal] = useState<boolean>(false);
    const [selectedArea, setSelectedArea] = useState<{key: string, name: string}>({name: 'Social', key: 'Sociais/Emocionais'});
    const [marcosChild, setMarcosChild] = useState<MarcosMerged[]>([]);
    const { activeChild } = useChildContext();

    function determineColor() {
        switch (selectedArea.key) {
            case 'Sociais/Emocionais':
                return 1;
            case 'Linguagem/Comunicação':
                return 2;
            case 'Cognitivos':
                return 3;
            case 'Movimento/Desenvolvimento Físico':
                return 4;
        }
    }

    function determineCardColor(tipo: string) {
      switch (tipo) {
          case 'Sociais/Emocionais':
              return 1;
          case 'Linguagem/Comunicação':
              return 2;
          case 'Cognitivos':
              return 3;
          case 'Movimento/Desenvolvimento Físico':
              return 4;
      }
    }

    const updateMarcoStatus = (number: string, newStatus: string) => {
      setMarcosChild((prev) =>
        prev.map((marco) =>
          marco.number === number ? { ...marco, status: newStatus } : marco
        )
      );
    };  

    useEffect(() => {
      async function fetchMarcos() {
        const def = await MarcosService.readAllDefault();
        const child = await MarcosService.readAllChildren(activeChild.idchildren);
        const mergedMarcos = child.map((marco) => {
          const defaultMarco = def.find((d) => d.number === marco.number);
          return {
            number: marco.number,
            status: marco.status,
            name: defaultMarco?.name || '',
            restricao: defaultMarco?.restricao || '',
            tipo: defaultMarco?.tipo || '',
            image: MarcosImages[Number(marco.number)] || MarcosImages[1],
          };
        });
        const filteredMarcos = mergedMarcos.filter(m => 
          m.restricao === selectedAge && m.tipo.toLowerCase() === selectedArea.key.toLowerCase()
        );
        setMarcosChild(filteredMarcos);
      }
      fetchMarcos();
    }, [selectedArea, selectedAge, activeChild])

    

    const renderItem = ({ item }) => (
      <MarcosCard
        image={item.image}
        text={item.name}
        color={determineCardColor(item.tipo)}
        number={item.number}
        status={item.status}
        onStatusChange={updateMarcoStatus}
      />
    );

    return (
        <S.Wrapper>
            <ChildrenHeader />
            <S.Content >
                <View style={{ gap: 10, flexDirection: 'row', width: '100%' }}>
                    <S.Button onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back-outline" size={20} color="white" />
                    </S.Button>
                    <S.Title>Marcos de Desenvolvimento</S.Title>
                </View>
                {!activeChild ?
                    <>
                      <S.Line />
                      <NoChildrenWarning />
                    </> 
                :
                    (<>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                        <MarcosFilterButton title={selectedAge} onPress={() => setAgeModal(true)} />
                        <MarcosFilterButton title={selectedArea.name} onPress={() => setAreaModal(true)} color={determineColor()} />
                      </View>

                      <FlatList
                        data={marcosChild}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={renderItem}
                        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
                        ListFooterComponent={() => <View style={{ height: 16 }} />}
                      />
                    </>)
                }
                <View />
            </S.Content>

            <AgeModal onClose={(a: string) => {setAgeModal(false); setSelectedAge(a)}} visible={ageModal} selectedAge={selectedAge} />
            <AreaModal onClose={(name: string, key: string) => {setAreaModal(false); setSelectedArea({name, key})}} visible={areaModal} selectedArea={selectedArea.name} />

        </S.Wrapper>
    );
};

export default MarcosScreen;
