import React, { useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import * as S from './styles';
import { Input } from '@components/Input';
import { LongButton } from '@components/LongButton';
import VerificationInput from '@components/VerificationInput';
import UserService from '@services/UserService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@routes/app.routes';

type Props = {
    visible: boolean;
    onClose: () => void;
};

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

const ForgotPasswordModal: React.FC<Props> = ({ visible, onClose }) => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [isCodeModalVisible, setIsCodeModalVisible] = useState(false);
    const [error, setError] = useState<string>(null);

    const navigation = useNavigation<NavigationProps>();

    const handleEmailSubmit = () => {
        if (!isValidEmail(email)) {
            setError('Insira um email válido!');
            setEmail('');
        }
        else {
            UserService.restorePassword(email);
            setIsCodeModalVisible(true);
        }
    };

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleCodeSubmit = () => {
        UserService.restorePassword(email);
        setIsCodeModalVisible(false);
        setEmail('');
        onClose();
        navigation.navigate('PasswordRecover', { code });
    };

    return (
        <>
            {/* PRIMEIRO MODAL */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={onClose}
            >
                <S.Container onPress={onClose}>
                    <TouchableWithoutFeedback>
                        <S.ModalContent>
                            <S.Title>Esqueci minha senha</S.Title>
                            <S.Line />
                            <S.Description>Se seu email estiver cadastrado te enviaremos um código de recuperação de senha.</S.Description>
                            <Input title={'Insira seu Email'} value={email} onChangeText={(a) => setEmail(a)} />
                            {error && (
                                <S.RedText style={{ color: 'red', width: '100%' }}>{error}</S.RedText>
                            )}
                            <View style={{ height: 24 }} />
                            <LongButton title={'Solicitar Código de Recuperação'} onPress={() => handleEmailSubmit()} />
                        </S.ModalContent>
                    </TouchableWithoutFeedback>
                </S.Container>
            </Modal>

            {/* SEGUNDO MODAL */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={isCodeModalVisible}
                onRequestClose={() => setIsCodeModalVisible(false)}
            >
                <S.Container onPress={() => setIsCodeModalVisible(false)}>
                    <TouchableWithoutFeedback>
                        <S.ModalContent>
                            <S.Title>Esqueci minha senha</S.Title>
                            <S.Line />
                            <S.Label>Insira o Código de Recuperação</S.Label>
                            <VerificationInput onCodeChange={(code) => setCode(code)} />
                            <View style={{ height: 24 }} />
                            <LongButton title={'Definir Nova Senha'} onPress={handleCodeSubmit} />
                        </S.ModalContent>
                    </TouchableWithoutFeedback>
                </S.Container>
            </Modal>
        </>
    );
};

export default ForgotPasswordModal;
