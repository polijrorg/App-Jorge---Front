import { View, Text } from 'react-native';
import * as S from './styles';
import Dropdown from '@components/Dropdown';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import React from 'react';

interface Props {
  onSubmit: (category: string, message: string) => void
}

export default function FeedbackCard(data: Props) {
    const [category, setCategory] = useState<string>('');
    const [text, setText] = useState<string>('');
    const options = [
        'Vacinas',
        'MedMama',
        'Marcos de Desenvolvimento',
        'Curva de Crescimento'
    ];

    function onFormSubmit() {
      data.onSubmit(category, text);
      if (category) {
        setText('');
        setCategory('');
      }
    }

    return (
        <S.Wrapper>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Dropdown options={options} onOptionSelect={(a) => setCategory(a)} />
                <S.Button onPress={() => onFormSubmit()}>
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
                    keyboardType='twitter'
                >
                </S.Container>
            </View>
        </S.Wrapper>
    );
}
