import React from "react";
import { Modal } from "react-native";
import * as S from "./styles";

interface Props {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function LogoutModal({ visible, onConfirm, onCancel }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <S.Fundo>
        <S.Container>
          <S.Description>Tem certeza que deseja sair?</S.Description>
          <S.Line />
          <S.ButtonContainer>
            <S.Button isCancel onPress={onCancel}>
              <S.Title selected={false}>Cancelar</S.Title>
            </S.Button>
            <S.Button onPress={onConfirm}>
              <S.Title selected={true}>Sair</S.Title>
            </S.Button>
          </S.ButtonContainer>
        </S.Container>
      </S.Fundo>
    </Modal>
  );
}
