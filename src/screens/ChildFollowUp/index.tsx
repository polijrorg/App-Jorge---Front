import * as S from './styles';
import React, { useEffect, useState } from 'react';
import AmbientCard from '@components/AmbientCard';
import { View, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Seringa from '@assets/icons/Seringa.png';
import Graph from '@assets/icons/Graph.png';
import Trophy from '@assets/icons/Trophy.png';
import { useChildContext } from '@hooks/useChild';
import ChildrenHeader from '@components/ChildrenHeader';
import ChildCard from '@components/ChildCard';
import datasets from '@services/DefaultCurves/datasets';
import GrowthDataService from '@services/GrowthDataService';
import GrowthData from '@interfaces/GrowthData';
import VaccineService from '@services/VaccineService';
import ChildrenService from '@services/ChildrenService';
import findClosestPercentile from '@utils/findClosestPercentile';

const percentiles = ["P3", "P15", "P50", "P85", "P97"];

const FollowUpScreen = ({ navigation }) => {
    const { activeChild: child, growthData, setGrowthData } = useChildContext();
    const [vaccineDev, setVaccineDev] = useState<number>(null);
    const [marcosDev, setMarcosDev] = useState<number>(null);
    const estimular = child.gender === 'masculino' ? 'estimulá-lo' : 'estimulá-la';

    async function fetchDevelopment() {
      const vaccine = await VaccineService.development(child.idchildren);
      setVaccineDev(Number(vaccine.developmentPercentage));
      const marcos = await ChildrenService.development(child.idchildren);
      setMarcosDev(Number(marcos.developmentPercentage));
    }

    useEffect(() => {
      fetchData();
      fetchDevelopment();
    }, [child]);
  
    async function fetchData() {
      let data = await GrowthDataService.getByChild(child.idchildren);
      if (data.length > 0) {
        data = data.sort((a, b) => {
          const ageA = a.age.years + a.age.months / 12;
          const ageB = b.age.years + b.age.months / 12;
          return ageA - ageB;
        });
      }
      setGrowthData(data);
    }

    function determineGrowthData(item: GrowthData, curve: string) {
      switch (curve) {
        case 'altura': return item.height;
        case 'peso': return item.weight;
        case 'imc': return item.imc;
      }
    }

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
                    weight={`${child.peso}kg` || 'weight'}
                    height={`${child.altura}cm` || 'height'}
                    id={child.idchildren}
                    gender={child.gender}
                />

                <S.Line />
                
                <S.Title>Resumo</S.Title>
                <S.Description>
                  {child.name} se encontra no percentil {findClosestPercentile('peso', child, growthData)} de peso e {findClosestPercentile('altura', child, growthData)} de altura.{'\n'}
                </S.Description>
                <S.Description>
                  {vaccineDev >= 70 ? 'Suas vacinas estão em dia.' : 'Suas vacinas estão atrasadas. Atualize o calendário vacinal!'}{'\n'}
                </S.Description>
                <S.Description>
                  {marcosDev >= 70 ? 'Os marcos de desenvolvimento estão adequados para sua idade.' : `Os marcos de desenvolvimento não vêm sendo atualizados. Converse com seu pediatra a respeito de como ${estimular}!`}
                </S.Description>
                <S.Line />
                
                <S.Title>Suas Ferramentas</S.Title>
                <ScrollView horizontal contentContainerStyle={{ alignItems: 'flex-start', justifyContent: 'space-evenly', width:'100%' }} style={{ maxHeight:100 }}>
                    <AmbientCard image={Graph} title={'Curvas de\nCrescimento'} onPress={() => navigation.navigate('Curva')} />
                    <AmbientCard image={Seringa} title={'Carteira de\nVacinas'} onPress={() => navigation.navigate('Vacinas')} />
                    <AmbientCard image={Trophy} title={'Marcos de\nDesenv.'} onPress={() => navigation.navigate('Marcos')} />
                </ScrollView>
            </S.Content>
        </S.Wrapper>
    )

};

export default FollowUpScreen;
