import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import * as S from './styles'
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import ForgotMyPasswordModal from '@components/ForgotMyPasswordModal';
import { useAuthContext } from '@hooks/useAuth';

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [modal, setModal] = useState(false);
    const [error, setError] = useState<string>(null);
    const { login } = useAuthContext();

    const loginUser = async () => {    
        try {
            const isLoginDone = await login({
                email: email,
                password: password,
            });
            if (isLoginDone) {
              navigation.navigate('Main', { screen: 'Home' });
              setEmail('');
              setPassword('');
            } else {
              setError("Usuário não encontrado!");
            }
        } catch (error) {
            alert("Email ou senha inválidos.");
            setError("Email ou senha inválidos!");
        }
    };

    return (
        <S.Wrapper>

            <S.Logo source={require('@assets/images/LogoAzul.png')}/>
            
            <Input title={'Login'} value={email} onChangeText={(email) => setEmail(email)} />
            <S.Password>
                <Input title={'Senha'} value={password} onChangeText={(password) => setPassword(password)} hideOption={true} />
                <TouchableOpacity onPress={() => setModal(true)} >
                    <S.BlueText>Esqueci minha senha</S.BlueText>
                </TouchableOpacity>
            </S.Password>
            {error && (
                    <S.BlueText style={{ color: 'red', width: '100%' }}>{error}</S.BlueText>
            )}

            <Button title={'Entrar'} onPress={loginUser} />
            <S.Line />

            <View style={{ flexDirection: 'row' }}>
                <S.BlackText>Não tem uma conta? </S.BlackText>
                <TouchableOpacity onPress={() => navigation.navigate('Register')} >
                    <S.BlueText>Cadastre-se</S.BlueText>
                </TouchableOpacity>
            </View>

            <ForgotMyPasswordModal visible={modal} onClose={() => setModal(false)}/>
            
        </S.Wrapper>
    )
}

export default LoginScreen;