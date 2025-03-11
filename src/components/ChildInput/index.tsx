import Ionicons from '@expo/vector-icons/Ionicons';
import * as S from './styles';
import { Platform, TouchableOpacity, Text } from 'react-native';
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
  isNumber?: boolean;
  unit?: string;
  isPassword?: boolean;
}

export function ChildInput({ isEditable = false, title, value, onChange, isDate = false, isSelection = false, options, isNumber = false, unit, isPassword = false }: Props) {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSecure, setIsSecure] = useState(isPassword);

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    onChange(option);
    setIsOpen(false);
  };

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      onChange(formatDate(selectedDate));
    }
  };

  return (
    <S.Wrapper>
      <S.Title>{title}</S.Title>
      {!isDate && !isSelection ? (
        <S.Container
          placeholderTextColor="lightgray"
          placeholder={`digite um ${title.toLowerCase()}`}
          value={value}
          keyboardType={isNumber ? 'numeric' : 'default'}
          onChangeText={(text) => onChange(text)}
          secureTextEntry={isSecure}
        />
      ) : !isSelection ? (
        <TouchableOpacity onPress={() => setShowPicker(true)}>
          <S.Container
            editable={false}
            value={value}
            pointerEvents="none"
            placeholderTextColor="lightgray"
            placeholder="Selecione uma data"
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
          <S.Container
            editable={false}
            value={value}
            pointerEvents="none"
            placeholderTextColor="lightgray"
            placeholder="Selecione uma opção"
          />
        </TouchableOpacity>
      )}

      {isEditable && (
        <S.ToggleButton onPress={() => setIsSecure(isPassword && !isSecure)}>
          <Ionicons name={isPassword ? isSecure ? "eye-off-outline" : "eye-outline" : "pencil-outline"} size={20} color="dark" />
        </S.ToggleButton>
      )}

      {showPicker && (
        Platform.OS === 'ios' ? (
          <DateTimePicker
            mode="date"
            value={new Date()}
            maximumDate={new Date()}
            onChange={handleDateChange}
          />
        ) : (
          <DateTimePicker
            mode="date"
            value={new Date()}
            maximumDate={new Date()}
            onChange={handleDateChange}
            display="default"
          />
        )
      )}

      {isOpen && (
        <S.OptionsContainer>
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
