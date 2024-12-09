import Ionicons from '@expo/vector-icons/Ionicons';
import * as S from './styles';
import { Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from "react";

interface Props {
    title: string,
    value: any,
    onChange: (a: any) => void;
    isEditable?: boolean;
    isDate?: boolean;
    isSelection?: boolean;
    options?: string[];
}

export function ChildInput({ isEditable = false, title, value, onChange, isDate = false, isSelection = false, options }: Props) {
    const [showPicker, setShowPicker] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleSelectOption = (option: string) => {
        setSelectedOption(option);
        onChange(option);
        setIsOpen(false);
    };

    return (
        <S.Wrapper>
            <S.Title>{title}</S.Title>
            {!isDate && !isSelection ? (
                <S.Container
                    placeholderTextColor="lightgray"
                    value={value}
                    onChangeText={onChange}
                />
            ) : !isSelection ? (
                <TouchableOpacity onPress={() => setShowPicker(true)}>
                    <S.Container
                        editable={false}
                        value={value instanceof Date ? value.toLocaleDateString('pt-BR') : value}
                        pointerEvents="none"
                    />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
                    <S.Container
                        editable={false}
                        value={value || 'Selecione uma opção'}
                        pointerEvents="none"
                    />
                </TouchableOpacity>
            )}

            {isEditable && (
                <S.ToggleButton>
                    <Ionicons name="pencil-outline" size={20} color="dark" />
                </S.ToggleButton>
            )}

            {showPicker && (
                Platform.OS === 'ios' ? (
                    <DateTimePicker
                        mode="date"
                        value={value instanceof Date ? value : new Date()}
                        maximumDate={new Date()}
                        onChange={(event, selectedDate) => {
                            setShowPicker(false);
                            if (selectedDate) onChange(selectedDate);
                        }}
                    />
                ) : (
                    <DateTimePicker
                        mode="date"
                        value={value instanceof Date ? value : new Date()}
                        maximumDate={new Date()}
                        onChange={(event, selectedDate) => {
                            setShowPicker(false);
                            if (selectedDate) onChange(selectedDate);
                        }}
                        display="default"
                    />
                )
            )}

            {isOpen && (
                <S.OptionsContainer >
                    {options.map((option, index) => (
                        <TouchableOpacity
                        key={index}
                        onPress={() => handleSelectOption(option)}
                        activeOpacity={0.6}
                        >
                        <S.Option>{option}</S.Option>
                        </TouchableOpacity>
                    ))}
                </S.OptionsContainer>
            )}

        </S.Wrapper>
    );
}
