import React from 'react';
import { Modal, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native';
import * as S from './styles';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const TermsAndConditionsModal: React.FC<Props> = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
        <S.Fundo activeOpacity={1} onPress={onClose}>
            <TouchableWithoutFeedback>
                <S.Container >
                    <S.Scroll
                        showsVerticalScrollIndicator={false}
                        bounces={false}
                        alwaysBounceVertical={false}
                        overScrollMode="never"
                    >
                        <S.Title>Termos e condições</S.Title>
                        <S.SectionTitle>LGPD</S.SectionTitle>
                        <S.Description>
                            A Lei Geral de Proteção de Dados (LGPD), sancionada em 2018 e em vigor desde 2020, estabelece diretrizes rigorosas para a coleta, armazenamento e uso de dados pessoais no Brasil. Seu objetivo principal é proteger a privacidade e os direitos dos indivíduos, garantindo que as empresas obtenham consentimento explícito para o tratamento de dados. A LGPD aplica-se a qualquer entidade que manipule dados pessoais, independentemente de sua localização.
                        </S.Description>
                        <TouchableOpacity>
                            <S.Text>Conferir {'>'}</S.Text>
                        </TouchableOpacity>
                        <S.SectionTitle>Como nós utilizamos seus dados</S.SectionTitle>
                        <S.Description>
                        Esses dados são utilizados para comunicação, suporte e marketing, sempre com seu consentimento. Implementamos medidas de segurança rigorosas para proteger suas informações contra acessos não autorizados. Você tem o direito de acessar, corrigir ou excluir seus dados a qualquer momento.
                        </S.Description>
                        <TouchableOpacity>
                            <S.Text>Conferir {'>'}</S.Text>
                        </TouchableOpacity>
                    </S.Scroll>
                </S.Container>
            </TouchableWithoutFeedback>
        </S.Fundo>
    </Modal>
  );
};

export default TermsAndConditionsModal;
