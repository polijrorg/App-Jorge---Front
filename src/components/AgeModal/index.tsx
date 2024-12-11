import React from 'react'
import * as S from './styles'
import { Modal } from 'react-native'

interface Props {
    onClose: (a: number) => void;
    visible: boolean;
    selectedAge: number;
}

export default function AgeModal(p: Props) {

    function handleSelected(buttonAge: number) {
        return p.selectedAge === buttonAge;
    }

    return (
        <Modal visible={p.visible} transparent animationType="fade">
            <S.Fundo>
                <S.Container>
                    <S.Description>Selecione o período de sua criança que deseja acompanhar:</S.Description>
                    <S.Line />
                    <S.Button onPress={() => p.onClose(4)} selected={handleSelected(4)}>
                        <S.Title selected={handleSelected(4)}>4 meses</S.Title>
                    </S.Button>
                    <S.Button onPress={() => p.onClose(6)} selected={handleSelected(6)}>
                        <S.Title selected={handleSelected(6)}>6 meses</S.Title>
                    </S.Button>
                    <S.Button onPress={() => p.onClose(8)} selected={handleSelected(8)}>
                        <S.Title selected={handleSelected(8)}>8 meses</S.Title>
                    </S.Button>
                </S.Container>
            </S.Fundo>
        </Modal>

    )
}