import React, { useCallback, useEffect, useState } from 'react'
import * as S from './styles'
import { Modal, TouchableWithoutFeedback } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import ChildrenService from '@services/ChildrenService';
import Child from '@interfaces/Child';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useChildContext } from '@hooks/useChild';

interface Props {
    onClose: () => void;
    visible: boolean;
}

export default function ChildModal(p: Props) {

    function handleSelected(buttonChild: string) {
        return activeChild?.idchildren == buttonChild;
    }

    const { setActiveChild, childList: children, activeChild } = useChildContext();

    async function handlePress(data: Child) {
        setActiveChild(data);
        p.onClose();
    }

    return (
        <Modal visible={p.visible} transparent animationType="fade">
            <S.Fundo onPress={() => p.onClose()}>
                <TouchableWithoutFeedback>
                    <S.Container>
                        <S.Description>Selecione qual criança deseja acompanhar:</S.Description>
                        <S.Line />
                        
                        {children.map((child) => (
                            <S.Button 
                                key={child.idchildren} 
                                onPress={() => handlePress(child)} 
                                selected={handleSelected(child.idchildren)}
                            >
                                <S.Title selected={handleSelected(child.idchildren)}>{child.name}</S.Title>
                            </S.Button>
                        ))}
                    </S.Container>
                </TouchableWithoutFeedback>
            </S.Fundo>
        </Modal>
    )
}