import * as S from './styles';
import React, { useEffect } from 'react';
import AmbientCard from '@components/AmbientCard';
import { View, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Seringa from '@assets/icons/Seringa.png';
import Graph from '@assets/icons/Graph.png';
import Trophy from '@assets/icons/Trophy.png';
import Mamadeira from '@assets/icons/Mamadeira.png';
import { useChildContext } from '@hooks/useChild';
import ChildrenHeader from '@components/ChildrenHeader';
import ChildCard from '@components/ChildCard';
import datasets from '@services/DefaultCurves/datasets';
import GrowthDataService from '@services/GrowthDataService';
import GrowthData from '@interfaces/GrowthData';

const percentiles = ["P3", "P15", "P50", "P85", "P97"];

const FollowUpScreen = ({ navigation }) => {
    const { activeChild: child, growthData, setGrowthData } = useChildContext();
    const estimular = child.gender === 'masculino' ? 'estimulá-lo' : 'estimulá-la';

    useEffect(() => {
      fetchData();
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

    const findClosestPercentile = (curve: string) => {
      const genderData = datasets[child.gender][curve];
      if (!genderData) return "N/A";
    
      const latestData = growthData[growthData.length - 1];
      if (!latestData) return 'P1';
    
      const measure = determineGrowthData(latestData, curve);
    
      const dataAge = latestData.age.months + latestData.age.years * 12;
    
      let closestPercentile = "N/A";
      let minDifference = Infinity;
    
      for (const percentile of percentiles) {
        const percentileData = genderData[percentile];
        const percentileValue = Number(percentileData[dataAge][percentile.toLowerCase()].replace(',', '.'));
        const difference = Math.abs(measure - percentileValue);
    
        if (difference < minDifference) {
          minDifference = difference;
          closestPercentile = percentile;
        }
      }
    
      return closestPercentile;
    };

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
                {child.name} se encontra no percentil {findClosestPercentile('peso')} de peso e {findClosestPercentile('altura')} de altura. Suas vacinas estão em dia. Atualize o calendário vacinal!
                Os marcos de desenvolvimento estão adequados para sua idade.
                Converse com seu pediatra a respeito de como {estimular}!

                </S.Description>
                <S.Line />
                
                <S.Title>Seus Ambientes</S.Title>
                <ScrollView horizontal contentContainerStyle={{ alignItems: 'flex-start', justifyContent: 'space-evenly', width:'100%' }} style={{ maxHeight:100 }}>
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
