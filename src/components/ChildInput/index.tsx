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
  isPhone?: boolean;
  nascimento?: string;
}

export function ChildInput({ nascimento, isPhone = false, isEditable = false, title, value, onChange, isDate = false, isSelection = false, options, isNumber = false, unit, isPassword = false }: Props) {
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

  const formatPhone = (text: string) => {
    text = text.replace(/\D/g, ""); // Remove tudo que não for número
  
    if (text.length > 10) {
      return `(${text.slice(0, 2)}) ${text.slice(2, 7)}-${text.slice(7, 11)}`;
    } else if (text.length > 6) {
      return `(${text.slice(0, 2)}) ${text.slice(2, 6)}-${text.slice(6, 10)}`;
    } else if (text.length > 2) {
      return `(${text.slice(0, 2)}) ${text.slice(2)}`;
    } else {
      return text;
    }
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
          value={isPhone ? formatPhone(value) : value}
          keyboardType={isNumber || isPhone ? 'numeric' : 'default'}
          onChangeText={(text) => onChange(isPhone ? formatPhone(text) : text)}
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
