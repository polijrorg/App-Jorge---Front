import React, { useState } from 'react';
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as S from "./styles";
import { Input } from "@components/Input";
import UserService from "@services/UserService";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@routes/app.routes";
import { LongButton } from '@components/LongButton';

const PasswordRecoverScreen = ({ navigation }) => {
  const route = useRoute<RouteProp<RootStackParamList, 'PasswordRecover'>>();
  const { code, email } = route.params;

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handlePasswordReset = async () => {
    if (password.length < 5 || password2.length < 5) {
      setError("A senha deve ter pelo menos 5 caracteres.");
    } else if (password !== password2) {
      setError("As senhas fornecidas são diferentes!");
      setPassword2("");
    } else {
      const errorMessage = await UserService.redefinePassword({
        token: code,
        newPassword: password,
        email: email
      });
      if (errorMessage) {
        console.log(errorMessage);
        setError(errorMessage);
      } else {
        setError(null);
        navigation.navigate("Login");
        alert("Atualização de Senha Realizada");
      }
    }
  };

  return (
    <S.Wrapper>
      <StatusBar style="dark" />
      <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
        <S.Logo source={require("@assets/images/LogoAzul.png")} />
        <S.TitleText>Bem Vindo!</S.TitleText>
      </View>

      <View style={{ width: "100%" }}>
        <S.TitleText>Recuperar Senha</S.TitleText>
      </View>

      <View style={{ gap: 16, width: "100%" }}>
        <Input title={"Nova Senha"} value={password} onChangeText={setPassword} hideOption={true} />
        <Input title={"Confirme sua Senha"} value={password2} onChangeText={setPassword2} hideOption={true} />

        {error && <S.BlueText style={{ color: "red" }}>{error}</S.BlueText>}
      </View>

      <LongButton title={"Definir nova senha"} onPress={handlePasswordReset} />
    </S.Wrapper>
  );
};

export default PasswordRecoverScreen;
