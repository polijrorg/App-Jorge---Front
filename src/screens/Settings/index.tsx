import * as S from "./styles"
import React, { useState } from 'react';
import { Linking, View } from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons"
import DefaultHeader from "@components/DefaultHeader"
import AddChildButton from "@components/AddChildButton";
import LogoutModal from "@components/LogoutModal";
import { useAuthContext } from "@hooks/useAuth";

const ConfiguracoesScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { logout } = useAuthContext();

  const handleLogout = async () => {
    logout();
    navigation.navigate('Login');
  }

  const handleNavigateBack = () => {
    navigation.goBack();
  }

  const handleNavigateToEditProfile = () => {
    navigation.navigate("EditProfile");
  }

  const handleNavigateToTerms = () => {
    Linking.openURL("https://jorge-back.puerino.com/termos/");
  }

  const handleNavigateToPolitics = () => {
    Linking.openURL("https://jorge-back.puerino.com/politicas/");
  }


  const handleNavigateToSources = () => {
    navigation.navigate("Sources");
  }

  return (
    <S.Wrapper>
      <DefaultHeader />
      <S.Content>
        <View style={{ flexDirection: "row", alignItems: "center", width: "100%", marginBottom: 10 }}>
          <S.Button onPress={handleNavigateBack}>
            <Ionicons name="arrow-back-outline" size={20} color="white" />
          </S.Button>
          <S.Title>Configurações</S.Title>
        </View>

        <S.MenuCard onPress={handleNavigateToEditProfile}>
          <S.IconContainer>
            <Ionicons name="person-outline" size={24} color="black" />
          </S.IconContainer>
          <S.MenuText>Editar perfil</S.MenuText>
        </S.MenuCard>
        <S.Line />

        <S.MenuCard onPress={handleNavigateToTerms}>
          <S.IconContainer>
            <Ionicons name="documents-outline" size={24} color="black" />
          </S.IconContainer>
          <S.MenuText>Termos de Uso</S.MenuText>
        </S.MenuCard>
        <S.Line />

        <S.MenuCard onPress={handleNavigateToPolitics}>
          <S.IconContainer>
            <Ionicons name="document-text-outline" size={24} color="black" />
          </S.IconContainer>
          <S.MenuText>Política de Privacidade</S.MenuText>
        </S.MenuCard>
        <S.Line />

        <S.MenuCard onPress={handleNavigateToSources}>
          <S.IconContainer>
            <Ionicons name="list-outline" size={24} color="black" />
          </S.IconContainer>
          <S.MenuText>Conheça nossas fontes</S.MenuText>
        </S.MenuCard>
        <LogoutModal
          visible={modalVisible} 
          onConfirm={handleLogout}
          onCancel={() => setModalVisible(false)} 
        />
        <AddChildButton hidePlus title='Sair do App' onPress={() => setModalVisible(true)} />
      </S.Content>
    </S.Wrapper>
  )
}

export default ConfiguracoesScreen

