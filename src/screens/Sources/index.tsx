import * as S from './styles';
import React from 'react';
import { View, Linking } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import DefaultHeader from '@components/DefaultHeader';

const SourcesScreen = ({ navigation }) => {

  const handleNavigateBack = () => {
    navigation.goBack();
  };

  const handleOpenLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <S.Wrapper>
      <DefaultHeader />
      <S.Content>
        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', marginBottom: 10 }}>
          <S.Button onPress={handleNavigateBack}>
            <Ionicons name="arrow-back-outline" size={20} color="white" />
          </S.Button>
          <S.Title>Conheça nossas fontes</S.Title>
        </View>

        <S.ContentCard>
          <S.Paragraph>
            O Puerino tem um compromisso com a informação de qualidade, garantindo que pais e mães tenham acesso a dados confiáveis para acompanhar a saúde e o desenvolvimento infantil. Todas as informações do aplicativo são baseadas em fontes reconhecidas e atualizadas.
          </S.Paragraph>
          
          <S.SectionTitle>As principais referências utilizadas incluem:</S.SectionTitle>
          
          <S.SourceItem>
            <S.BulletPoint>•</S.BulletPoint>
            <View style={{ flex: 1 }}>
              <S.SourceTitle>Curvas de crescimento</S.SourceTitle>
              <S.SourceDescription>Padrões estabelecidos pela Organização Mundial da Saúde (OMS).</S.SourceDescription>
              <S.LinkButton onPress={() => handleOpenLink('https://www.who.int/tools/child-growth-standards')}>
                <S.LinkText>https://www.who.int/tools/child-growth-standards</S.LinkText>
              </S.LinkButton>
            </View>
          </S.SourceItem>
          
          <S.SourceItem>
            <S.BulletPoint>•</S.BulletPoint>
            <View style={{ flex: 1 }}>
              <S.SourceTitle>Marcos do desenvolvimento</S.SourceTitle>
              <S.SourceDescription>Diretrizes do CDC (Centers for Disease Control and Prevention).</S.SourceDescription>
              <S.LinkButton onPress={() => handleOpenLink('https://www.cdc.gov/ncbddd/actearly/milestones')}>
                <S.LinkText>https://www.cdc.gov/ncbddd/actearly/milestones</S.LinkText>
              </S.LinkButton>
            </View>
          </S.SourceItem>
          
          <S.SourceItem>
            <S.BulletPoint>•</S.BulletPoint>
            <View style={{ flex: 1 }}>
              <S.SourceTitle>Vacinas</S.SourceTitle>
              <S.SourceDescription>Informações da SBIM (Sociedade Brasileira de Imunizações).</S.SourceDescription>
              <S.LinkButton onPress={() => handleOpenLink('https://sbim.org.br/')}>
                <S.LinkText>https://sbim.org.br/</S.LinkText>
              </S.LinkButton>
            </View>
          </S.SourceItem>
          
          <S.SourceItem>
            <S.BulletPoint>•</S.BulletPoint>
            <View style={{ flex: 1 }}>
              <S.SourceTitle>Amamentação e medicamentos</S.SourceTitle>
              <S.SourceDescription>- Ministério da Saúde do Brasil. Secretaria da Atenção à Saúde. Departamento de Ações Programáticas e Estratégicas. "Amamentação e uso de medicamentos e outras substâncias" 2. ed., 1. reimpr. – Brasília : Ministério da Saúde, 2014.</S.SourceDescription>
              
              <S.SourceDescription>- Sociedade Brasileira de Pediatria. Uso de medicamentos e outras substâncias pela mulher durante a amamentação. SBP; 2017.</S.SourceDescription>
              <S.LinkButton onPress={() => handleOpenLink('https://www.sbp.com.br/departamentos/aleitamento-materno/documentos-cientificos/')}>
                <S.LinkText>https://www.sbp.com.br/departamentos/aleitamento-materno/documentos-cientificos/</S.LinkText>
              </S.LinkButton>
              
              <S.SourceDescription>- APILAM (Association for promotion of and cultural and scientific research into breastfeeding). (2002). e-lactancia.</S.SourceDescription>
              <S.LinkButton onPress={() => handleOpenLink('https://e-lactancia.org')}>
                <S.LinkText>https://e-lactancia.org</S.LinkText>
              </S.LinkButton>
            </View>
          </S.SourceItem>
        </S.ContentCard>
      </S.Content>
    </S.Wrapper>
  );
};

export default SourcesScreen;
