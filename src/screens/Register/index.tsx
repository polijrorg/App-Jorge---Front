import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as S from './styles'
import { LogoAzul } from '@assets/images/LogoAzul.png'
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { ReadAndAgree } from '@components/ReadAndAgree';
import PrivacyPolicyModal from '@components/PrivacyPolicyModal';
import TermsAndConditionsModal from '@components/TermsAndConditionsModal';

const RegisterScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [isChecked1, setIsChecked1] = useState<boolean>(false);
    const [isChecked2, setIsChecked2] = useState<boolean>(false);
    const [privacyPolicy, setPrivacyPolicy] = useState<boolean>(false);
    const [TOS, setTOS] = useState<boolean>(false);

    const handleRegister = () => {
    }

    return (
        <S.Wrapper>
            <StatusBar style="dark" />
            <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
                <S.Logo source={require('@assets/images/LogoAzul.png')}/>
                <S.TitleText>Bem Vindo!</S.TitleText>
            </View>

            <View style={{ width: '100%' }} >
                <S.TitleText>Cadastrar-se</S.TitleText>
            </View>
            
            <View style={{ gap: 16, width: '100%' }}>
                <Input title={'Nome'} value={name} onChangeText={(name) => setName(name)} />
                <Input title={'Email'} value={email} onChangeText={(email) => setEmail(email)} />
                <Input title={'Senha'} value={password} onChangeText={(password) => setPassword(password)} />
                <Input title={'Confirme sua Senha'} value={password2} onChangeText={(password2) => setPassword2(password2)} />
            </View>

            <View style={{ gap: 8, width: '100%', alignItems: 'flex-start' }}>
                <ReadAndAgree isChecked={isChecked1} blueText='termos de uso' blackText='Li e concordo com os' onPress={() => setIsChecked1(!isChecked1)} onTextPress={() => setTOS(true)}/>
                <ReadAndAgree isChecked={isChecked2} blueText='política de privacidade' blackText='Li e concordo com os' onPress={() => setIsChecked2(!isChecked2)} onTextPress={() => setPrivacyPolicy(true)}/>
            </View>

            <Button title={'Cadastrar'} onPress={() => navigation.navigate('Main', { screen: 'Home' })} />
            <S.Line />

            <View style={{ flexDirection: 'row' }}>
                <S.BlackText>Já tem uma conta? </S.BlackText>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} >
                    <S.BlueText>Faça Login</S.BlueText>
                </TouchableOpacity>
            </View>

            <PrivacyPolicyModal visible={privacyPolicy} onClose={() => setPrivacyPolicy(false)} />
            <TermsAndConditionsModal visible={TOS} onClose={() => setTOS(false)} />

        </S.Wrapper>
    )
}

export default RegisterScreen;