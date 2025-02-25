import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import * as S from './styles'
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import ForgotMyPasswordModal from '@components/ForgotMyPasswordModal';
import DefaultHeader from '@components/DefaultHeader';

const SettingsScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [modal, setModal] = useState(false);

    return (
        <S.Wrapper>

            <S.Logo source={require('@assets/images/LogoAzul.png')}/>
            
            <Input title={'Login'} value={email} onChangeText={(email) => setEmail(email)} />
            <S.Password>
                <Input title={'Senha'} value={password} onChangeText={(password) => setPassword(password)} />
                <TouchableOpacity onPress={() => setModal(true)} >
                    <S.BlueText>Esqueci minha senha</S.BlueText>
                </TouchableOpacity>
            </S.Password>

            <Button title={'Entrar'} onPress={() => console.log('implementar handleLogin depois')} />
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

export default SettingsScreen;