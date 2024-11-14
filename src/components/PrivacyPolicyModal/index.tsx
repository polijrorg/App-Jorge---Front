import React from 'react';
import { Modal, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native';
import * as S from './styles';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const PrivacyPolicyModal: React.FC<Props> = ({ visible, onClose }) => {
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
                        <S.Title>Política de privacidade</S.Title>
                        <S.SectionTitle>LGPD</S.SectionTitle>
                        <S.Text>1. Informações que Coletamos</S.Text>
                        <S.Description>
                            Podemos coletar informações de identificação pessoal, como nome, endereço de e-mail, número de telefone, e informações de navegação, como endereço IP, tipo de dispositivo, navegador e páginas acessadas.
                        </S.Description>
                        <S.Text>2. Uso das Informações</S.Text>
                        <S.Description>
                            As informações que coletamos são usadas para:
                            {"\n"}• Fornecer, operar e melhorar nossos serviços;
                            {"\n"}• Personalizar a experiência do usuário;
                            {"\n"}• Enviar comunicações e notificações importantes;
                            {"\n"}• Responder a dúvidas e solicitações de suporte.
                        </S.Description>
                        <S.Text>3. Compartilhamento de Informações</S.Text>
                        <S.Description>
                            Não compartilhamos suas informações com terceiros, exceto em casos necessários para:
                            {"\n"}• Cumprimento de obrigações legais;
                            {"\n"}• Prestação de serviços por parceiros confiáveis, sempre com as devidas medidas de segurança.
                        </S.Description>
                        <S.Text>4. Segurança das Informações</S.Text>
                        <S.Description>
                            Empregamos medidas de segurança para proteger suas informações contra acessos não autorizados, alterações, divulgações ou destruições. No entanto, nenhum sistema é 100% seguro, e não podemos garantir a segurança absoluta.
                        </S.Description>
                        <S.Text>5. Seus Direitos</S.Text>
                        <S.Description>
                            Você tem o direito de:
                            {"\n"}• Acessar, corrigir ou excluir suas informações;
                            {"\n"}• Retirar seu consentimento para o uso de dados pessoais;
                            {"\n"}• Solicitar informações sobre o uso e tratamento dos seus dados.
                        </S.Description>
                        <S.Text>6. Alterações na Política de Privacidade</S.Text>
                        <S.Description>
                            Podemos atualizar esta Política de Privacidade periodicamente. Recomendamos revisar esta página regularmente para se manter informado sobre quaisquer mudanças.
                        </S.Description>
                    </S.Scroll>
                </S.Container>
            </TouchableWithoutFeedback>
        </S.Fundo>
    </Modal>
  );
};

export default PrivacyPolicyModal;
