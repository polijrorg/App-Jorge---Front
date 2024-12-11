import React from 'react'
import * as S from './styles'
import { Modal } from 'react-native'

interface Props {
    onClose: (a: string) => void;
    visible: boolean;
    selectedArea: string;
}

export default function AreaModal(p: Props) {

    return (
        <Modal visible={p.visible} transparent animationType="fade">
            <S.Fundo>
                <S.Container>
                    <S.Description>Selecione o período de sua criança que deseja acompanhar:</S.Description>
                    <S.Line />
                    <S.Button color={1} onPress={() => p.onClose('Social')}>
                        <S.Title>Social</S.Title>
                    </S.Button>
                    <S.Button color={2} onPress={() => p.onClose('Linguagem')}>
                        <S.Title>Linguagem</S.Title>
                    </S.Button>
                    <S.Button color={3} onPress={() => p.onClose('Cognitivo')}>
                        <S.Title>Cognitivo</S.Title>
                    </S.Button>
                    <S.Button color={4} onPress={() => p.onClose('Motor')}>
                        <S.Title>Motor</S.Title>
                    </S.Button>
                    <S.Button color={5} onPress={() => p.onClose('Quando Prevenir Cedo')}>
                        <S.Title>Quando Prevenir Cedo</S.Title>
                    </S.Button>
                </S.Container>
            </S.Fundo>
        </Modal>

    )
}