import * as S from './styles';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ChildInput } from '@components/ChildInput';
import AddChildButton from '@components/AddChildButton';
import UserService from '@services/UserService';
import { useAuthContext } from '@hooks/useAuth';
import DefaultHeader from '@components/DefaultHeader';
import CityDropdown from "@components/CityDropdown"

interface Data {
  name: string;
    email: string;
    gender: string;
    state: string;
    nascimento: string;
    telefone: string;
    password?: string;
}

const EditProfileScreen = ({ navigation }) => {
  const { user, setUser } = useAuthContext();
    
  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
    setPassword('');
    setGender(user?.gender || '');
    setState(user?.state || '');
    setBirthDate(user?.nascimento || '');
    setPhone(user?.telefone || '');
    console.log("UseEffect foi rodado novamente!");
  }, [user]);

  // const handleLogout = async () => {
  //   logout();
  //   navigation.navigate('Login');
  // }

  // const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [state, setState] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  // const [success, setSuccess] = useState(false);

  async function handleConfirm() {
    if (!name) setError('Insira um nome válido!');
    else if (!email) setError('Insira um email válido!');
    else if (!birthDate) setError('Insira uma data de nascimento válida!');
    else if (!phone) setError('Insira um telefone válido!');
    else {
      let data: Data = {
        name,
        email,
        gender,
        state,
        nascimento: birthDate,
        telefone: phone,
      };
      if (password && password.length >= 5) {
        data.password = password;
      } else if (password && password.length < 5) {
        return setError('Sua nova senha deve ter pelo menos 5 caracteres! Se quiser manter a senha atual, deixe o campo em branco.');
      }
      console.log("os seguintes dados foram usados no update: ", data);
      if (password && password.length < 5) {
        setError('Sua nova senha deve ter pelo menos 5 caracteres! Se quiser manter a senha atual, deixe o campo em branco.');
      } else {
        await UserService.update(data, user.id);
        setUser({ ...user, ...data });
        // setSuccess(true);
        navigation.goBack();
      }
    }
  }

  return (
    <S.Wrapper>
      <DefaultHeader />
      <S.Content>
        <View style={{ gap: 10, flexDirection: 'row', width: '100%' }}>
          <S.Button onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={20} color="white" />
          </S.Button>
          <S.Title>Editar Perfil</S.Title>
        </View>

        <S.Description>Dados Básicos</S.Description>
        <ChildInput title='Nome' value={name} onChange={setName} isEditable />
        <ChildInput title='Email' value={email} onChange={setEmail} isEditable />
        <ChildInput title='Senha' value={password} onChange={setPassword} isEditable isPassword />
        <ChildInput title='Sexo' value={gender} onChange={setGender} isSelection options={['Masculino', 'Feminino']} isEditable />
        <CityDropdown
          initialValue={state}
          onType={(a: string) => setState(a)}
          onSelectItem={(a: string) => setState(a)}
        />
        <ChildInput title='Data de nascimento' value={birthDate} onChange={setBirthDate} isDate isEditable />
        <ChildInput isPhone title='Telefone' value={phone} onChange={setPhone} isEditable />

        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
        {/* {success && <S.SuccessMessage>Suas credenciais foram atualizadas com sucesso!</S.SuccessMessage>} */}

        <View style={{ gap: 8 }}>
          <AddChildButton title='Salvar e Voltar' onPress={handleConfirm} />
        </View>
      </S.Content>
      {/* <LogoutModal
        visible={modalVisible} 
        onConfirm={handleLogout}
        onCancel={() => setModalVisible(false)} 
      /> */}
    </S.Wrapper>
  );
};

export default EditProfileScreen;
