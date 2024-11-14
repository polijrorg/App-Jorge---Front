import React, { useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import * as S from './styles';
import { Input } from '@components/Input';
import { LongButton } from '@components/LongButton';
import VerificationInput from '@components/VerificationInput';

type Props = {
    visible: boolean;
    onClose: () => void;
};

const ForgotPasswordModal: React.FC<Props> = ({ visible, onClose }) => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [isCodeModalVisible, setIsCodeModalVisible] = useState(false);

    const handleEmailSubmit = () => {
        setIsCodeModalVisible(true);
    };

    const handleCodeSubmit = () => {
        setIsCodeModalVisible(false);
        setEmail('');
        onClose();
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
