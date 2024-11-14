import React, { useState } from 'react';
import * as S from './styles';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DropdownProps {
  options: string[];
  onOptionSelect: (option: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onOptionSelect }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    onOptionSelect(option);
    setIsOpen(false);
  };

  return (
    <S.Container>
      <S.SelectedOptionButton onPress={() => setIsOpen(!isOpen)}>
        <S.SelectedOption>{selectedOption || 'Escolha uma categoria'}</S.SelectedOption>
        <S.ChevronDown isOpen={isOpen} source={require('@assets/icons/down.png')} />
      </S.SelectedOptionButton>
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
    </S.Container>
  );
};

export default Dropdown;
