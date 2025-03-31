import React, { useState } from 'react';
import { View, TouchableOpacity, Linking, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as S from './styles'
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import UserService from '@services/UserService';

const ReadAndAgree = ({ isChecked, onPress }) => {
    return (
      <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'center', alignItems: 'center' }}>
        <S.Checkbox onPress={onPress} style={{ backgroundColor: isChecked ? '#006ADC' : 'white' }} />
        <S.BlackText>
          Li e concordo com os{' '}
          <Text 
            style={{ color: '#4E92B7' }} 
            onPress={() => Linking.openURL("https://jorge-back.puerino.com/termos/")}
          >
            termos de uso{' '}
          </Text>
          e com a{' '}
          <Text 
            style={{ color: '#4E92B7' }} 
            onPress={() => Linking.openURL("https://jorge-back.puerino.com/politicas/")}
          >
            política de privacidade.
          </Text>
        </S.BlackText>
      </View>
    );
}

const Register = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [isChecked1, setIsChecked1] = useState<boolean>(false);
    const [error, setError] = useState<string>(null);

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleRegister = () => {
        
        if (!(isChecked1)) {
            setError('Aceite a condição abaixo para continuar!')
        }
        else if (name === '') {
            setError('Forneça um nome válido!')
        }
        else if (!isValidEmail(email)) {
            setError('Forneça um email válido para continuar!')
        }
        else if (password != password2) {
            setError('As senhas fornecidas são diferentes!');
            setPassword2('');
        }
        else if (password.length < 6) {
            setError('A senha deve conter pelo menos 6 caracteres!')
            setPassword2('');
            setPassword('');
        }
        else {
            UserService.create({ email, name, password });
            navigation.navigate('Login', { registerEmail: email });
            // alert("Cadastro Realizado");
        }
    }

    return (
        <S.Wrapper>
            <StatusBar style="dark" />
            <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
                <S.Logo source={require('@assets/images/LogoAzul.png')}/>
                <S.TitleText>Bem Vindo!</S.TitleText>
            </View>

            <View style={{ width: '100%' }} >
                <S.TitleText>Cadastre-se </S.TitleText>
            </View>
            
            <View style={{ gap: 16, width: '100%' }}>
                <Input title={'Nome'} value={name} onChangeText={(name) => setName(name)} />
                <Input title={'Email'} value={email} onChangeText={(email) => setEmail(email)} />
                <Input title={'Senha'} value={password} onChangeText={(password) => setPassword(password)} hideOption={true} />
                <Input title={'Confirme sua Senha'} value={password2} onChangeText={(password2) => setPassword2(password2)} hideOption={true} />

                {error && (
                    <S.BlueText style={{ color: 'red' }}>{error}</S.BlueText>
                )}

            </View>

            <View style={{ gap: 8, width: '100%', alignItems: 'flex-start' }}>
                <ReadAndAgree isChecked={isChecked1} onPress={() => setIsChecked1(!isChecked1)} />
            </View>

            <Button title={'Cadastrar'} onPress={handleRegister} />

            <S.Line />

            <View style={{ flexDirection: 'row' }}>
                <S.BlackText>Já tem uma conta? </S.BlackText>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} >
                    <S.BlueText>Faça Login</S.BlueText>
                </TouchableOpacity>
            </View>

        </S.Wrapper>
    )
}

export default Register;