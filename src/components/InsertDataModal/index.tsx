import React, { useState } from 'react';
import * as S from './styles';
import { Modal, TouchableWithoutFeedback } from 'react-native';
import { ChildInput } from '@components/ChildInput';
import AddChildButton from '@components/AddChildButton';

interface NewRowData {
  weight: string;
  height: string;
  growthDate: string;
}

interface Props {
  onClose: (a: NewRowData) => void;
  visible: boolean;
  onCancel: () => void;
}

export default function InsertDataModal(p: Props) {
  const [error, setError] = useState<boolean>(false);
  const [data, setData] = useState<NewRowData>({
    height: '',
    weight: '',
    growthDate: '',
  });

  function formatDecimal(input: string) {
    let formatted = input.replace(',', '.');
    formatted = formatted.replace(/[^0-9.]/g, '');

    if (formatted.includes('.')) {
      const [intPart, decimalPart] = formatted.split('.');
      formatted = `${intPart}.${decimalPart.slice(0, 2)}`;
    }

    return formatted;
  }

  function handlePress(data: NewRowData) {
    if (!data.weight || !data.height || !data.growthDate) {
      setError(true);
    } else {
      setError(false);
      p.onClose(data);
      setData({ height: '', weight: '', growthDate: '' });
    }
  }

  return (
    <Modal visible={p.visible} transparent animationType="fade">
      <S.Fundo onPress={() => p.onCancel()}>
        <TouchableWithoutFeedback>
          <S.Container>
            <S.Title>Adicionar estatura e peso:</S.Title>
            <S.Line />
            <ChildInput
              title="Data"
              value={data.growthDate}
              onChange={(a) => setData((prevData) => ({ ...prevData, growthDate: a }))}
              isDate={true}
            />
            <ChildInput
              title="Altura (em cm)"
              value={data.height}
              onChange={(a) =>
                setData((prevData) => ({ ...prevData, height: formatDecimal(a) }))
              }
              isNumber={true}
            />
            <ChildInput
              title="Peso (em kg)"
              value={data.weight}
              onChange={(a) =>
                setData((prevData) => ({ ...prevData, weight: formatDecimal(a) }))
              }
              isNumber={true}
              unit="kg"
            />
            <S.Line />
            {error && <S.Title color="red">Por favor, preencha todos os campos.</S.Title>}
            <AddChildButton title="Adicionar Dados" onPress={() => handlePress(data)} />
          </S.Container>
        </TouchableWithoutFeedback>
      </S.Fundo>
    </Modal>
  );
}
