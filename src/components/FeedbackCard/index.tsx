import { View, Text } from 'react-native';
import * as S from './styles';
import Dropdown from '@components/Dropdown';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import React from 'react';

export default function FeedbackCard() {
    const [selectedOption, setSelectedOption] = useState<string>();
    const [text, setText] = useState<string>();
    const options = [
        'Vacinas',
        'MedMama',
        'Medicamentos',
        'Curva de Crescimento'
    ];

    return (
        <S.Wrapper>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Dropdown options={options} onOptionSelect={(a) => setSelectedOption(a)} />
                <S.Button>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <Ionicons name="send" size={20} color="white" />
                        <S.Label>Enviar</S.Label>
                    </View>
                </S.Button>
            </View>

            <View style={{ position: 'relative' }}>
                
                <S.Container
                    placeholder='Deixe sua crítica, dúvida ou sugestão!'
                    placeholderTextColor='gray'
                    value={text}
                    onChangeText={(a) => setText(a)}
                    multiline
                    style={{ padding: 10 }}
                >
                </S.Container>
            </View>
        </S.Wrapper>
    );
}
