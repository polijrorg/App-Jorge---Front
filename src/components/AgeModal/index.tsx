import React from 'react'
import * as S from './styles'
import { Modal, ScrollView } from 'react-native'

interface Props {
    onClose: (a: string) => void;
    visible: boolean;
    selectedAge: string;
}

export default function AgeModal(p: Props) {

    function handleSelected(buttonAge: string) {
        return p.selectedAge === buttonAge;
    }

    return (
        <Modal visible={p.visible} transparent animationType="fade">
            <S.Fundo>
                <S.Container>
                    <S.Description>Selecione o período de sua criança que deseja acompanhar:</S.Description>
                    <ScrollView style={{ width:'100%' }}>
                        <S.Line />
                        <S.Button onPress={() => p.onClose('2 meses')} selected={handleSelected('2 meses')}>
                            <S.Title selected={handleSelected('2 meses')}>2 meses</S.Title>
                        </S.Button>
                        <S.Button onPress={() => p.onClose('4 meses')} selected={handleSelected('4 meses')}>
                            <S.Title selected={handleSelected('4 meses')}>4 meses</S.Title>
                        </S.Button>
                        <S.Button onPress={() => p.onClose('6 meses')} selected={handleSelected('6 meses')}>
                            <S.Title selected={handleSelected('6 meses')}>6 meses</S.Title>
                        </S.Button>
                        <S.Button onPress={() => p.onClose('9 meses')} selected={handleSelected('9 meses')}>
                            <S.Title selected={handleSelected('9 meses')}>9 meses</S.Title>
                        </S.Button>
                        <S.Button onPress={() => p.onClose('12 meses')} selected={handleSelected('12 meses')}>
                            <S.Title selected={handleSelected('12 meses')}>12 meses</S.Title>
                        </S.Button>
                        <S.Button onPress={() => p.onClose('15 meses')} selected={handleSelected('15 meses')}>
                            <S.Title selected={handleSelected('15 meses')}>15 meses</S.Title>
                        </S.Button>
                        <S.Button onPress={() => p.onClose('18 meses')} selected={handleSelected('18 meses')}>
                            <S.Title selected={handleSelected('18 meses')}>18 meses</S.Title>
                        </S.Button>
                        <S.Button onPress={() => p.onClose('2 anos')} selected={handleSelected('2 anos')}>
                            <S.Title selected={handleSelected('2 anos')}>2 anos</S.Title>
                        </S.Button>
                        <S.Button onPress={() => p.onClose('30 meses')} selected={handleSelected('30 meses')}>
                            <S.Title selected={handleSelected('30 meses')}>30 meses</S.Title>
                        </S.Button>
                        <S.Button onPress={() => p.onClose('3 anos')} selected={handleSelected('3 anos')}>
                            <S.Title selected={handleSelected('3 anos')}>3 anos</S.Title>
                        </S.Button>
                        <S.Button onPress={() => p.onClose('4 anos')} selected={handleSelected('4 anos')}>
                            <S.Title selected={handleSelected('4 anos')}>4 anos</S.Title>
                        </S.Button>
                        <S.Button onPress={() => p.onClose('5 anos')} selected={handleSelected('5 anos')}>
                            <S.Title selected={handleSelected('5 anos')}>5 anos</S.Title>
                        </S.Button>
                    </ScrollView>
                </S.Container>
            </S.Fundo>
        </Modal>

    )
}