import * as S from "./styles"
import { Modal, ScrollView, TouchableOpacity, View } from "react-native"
import type Vaccine from "@interfaces/Vaccine"
import Ionicons from "@expo/vector-icons/Ionicons"
import React from "react"

interface Props {
  vaccine: Vaccine;
  visible: boolean;
  onClose: () => void;
  onStatusChange: (status: "TOMOU" | "VAI_TOMAR" | "NAO_VAI_TOMAR") => void;
}

function capitalize(string: string) {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export default function VaccineModal({ vaccine, visible, onClose, onStatusChange }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <S.Backdrop>
        <S.Container>
          <View style={{ gap: 10, flexDirection: "row", width: "100%", padding: 16 }}>
            <S.Button onPress={onClose}>
              <Ionicons name="arrow-back-outline" size={20} color="white" />
            </S.Button>
            <S.Title>Vacina {capitalize(vaccine?.vaccine.name)}</S.Title>
          </View>

          <ScrollView style={{ width: "100%" }}>
            <S.Content>
              <S.Section>
                <S.SectionTitle>O que previne:</S.SectionTitle>
                <S.SectionText>{vaccine?.vaccine.prevents}</S.SectionText>
              </S.Section>

              <S.Section>
                <S.SectionTitle>Do que é feita:</S.SectionTitle>
                <S.SectionText>{vaccine?.vaccine.composition}</S.SectionText>
              </S.Section>

              <S.Section>
                <S.SectionTitle>Indicação:</S.SectionTitle>
                <S.SectionText>{vaccine?.vaccine.indication}</S.SectionText>
              </S.Section>
            </S.Content>
          </ScrollView>

          <S.ButtonContainer>
            <S.StatusButton status="TOMOU" onPress={() => onStatusChange("TOMOU")}>
              <S.ButtonText>Tomou</S.ButtonText>
            </S.StatusButton>

            <S.StatusButton status="VAI_TOMAR" onPress={() => onStatusChange("VAI_TOMAR")}>
              <S.ButtonText>Vai tomar</S.ButtonText>
            </S.StatusButton>

            <S.StatusButton status="NAO_VAI_TOMAR" onPress={() => onStatusChange("NAO_VAI_TOMAR")}>
              <S.ButtonText>Não vai tomar</S.ButtonText>
            </S.StatusButton>
          </S.ButtonContainer>
        </S.Container>
      </S.Backdrop>
    </Modal>
  )
}
