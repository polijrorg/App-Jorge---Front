import React, { useState, useRef, useEffect } from 'react';
import * as S from './styles';
import { TextInput } from 'react-native';

interface Props {
  onCodeChange: (code: string) => void;
}

const VerificationInput: React.FC<Props> = ({
  onCodeChange,
}) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChangeText = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < inputs.current.length - 1) {
      inputs.current[index + 1]?.focus();
    }

    onCodeChange(newCode.join(''));
  };

  useEffect(() => {
    onCodeChange(code.join(''));
  }, [code]);

  return (
    <S.InputContainer>
      {code.map((value, index) => (
        <S.Input
          key={index}
          ref={(ref) => (inputs.current[index] = ref)}
          value={value}
          onChangeText={(text) => handleChangeText(text, index)}
          keyboardType="number-pad"
          maxLength={1}
          autoFocus={index === 0}
        />
      ))}
    </S.InputContainer>
  );
};

export default VerificationInput;