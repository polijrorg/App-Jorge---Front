import React, { useEffect, useState } from 'react';
import * as S from './styles';
import Ionicons from "@expo/vector-icons/Ionicons";
import ChildrenHeader from '@components/ChildrenHeader';
import CurveTypeButton from '@components/CurveTypeButton';
import { View } from 'react-native';
import Vaccine from '@interfaces/Vaccine';
import VaccineService from '@services/VaccineService';
import { useChildContext } from '@hooks/useChild';
import NoChildrenWarning from '@components/NoChildrenWarning';

interface ButtonProps {
  text: string,
  isPrivate?: boolean,
  isPublic?: boolean,
  status?: string,
  color?: string,
  next?: boolean
}

interface Row {
  age: string;
  chunks: any[];
}

type ButtonPropsWithoutText = Omit<ButtonProps, "text">;

function determineColor(data: ButtonPropsWithoutText) {
  if (data.next) {
    if (data.isPublic) return 'rgba(188, 54, 54, 0.36)';
    else return 'rgba(188, 54, 54, 0.72)';
  } else {
    switch (data.status) {
      case 'NAO_VAI_TOMAR': return 'rgba(208, 115, 39, 1)';
      case 'TOMOU': return 'rgba(176, 224, 187, 1)';
      case 'VAI_TOMAR': return 'rgba(219, 158, 39, 1)';
      default: return 'lightgreen';
    }
  }
}

function Button(data: ButtonProps) {
  return (
    <S.ButtonContainer color={data.color || determineColor(data)}>
      <S.ButtonText>{data.text}</S.ButtonText>
    </S.ButtonContainer>
  )
}

function LegendItem({ text, color }: { text: string, color: string }) {
  return (
    <S.LegendRow>
      <View style={{ backgroundColor: color, height: 6, width: 10, borderRadius: 3 }}/>
      <S.LegendText>{text}</S.LegendText>
    </S.LegendRow>
  )
}

const ProgressBar = ({ percentage, color }: { percentage: number; color: string }) => {
  return (
    <S.LegendRow>
      <S.LegendText>Vacinas tomadas:</S.LegendText>
      <S.ProgressBarBackground>
        <S.ProgressBarFill style={{ width: `${percentage}%`, backgroundColor: color }} />
      </S.ProgressBarBackground>
      <S.LegendText>4/6</S.LegendText>
    </S.LegendRow>
  );
};

const Buttons = [
  'Próximas',
  'Histórico',
]

function Vacinas({ navigation }) {
  const [filter, setFilter] = useState<string>('Próximas');
  const [rows, setRows] = useState<Row[]>([]);
  const { activeChild } = useChildContext();

  useEffect(() => {
    fetchVaccines();
    console.log(rows);
  }, [filter, activeChild]);

  async function fetchVaccines() {
    const vaccineList = (filter === 'Próximas')
      ? await VaccineService.getNext(activeChild.idchildren)
      : await VaccineService.getPast(activeChild.idchildren);

    const groupedVaccines = groupVaccinesByAge(vaccineList);
    const rows = Object.entries(groupedVaccines).map(([age, vaccines]) => {
      const chunks = chunkArray(vaccines, 2);
      return { age, chunks };
    });

    setRows(rows);
  }

  function groupVaccinesByAge(vaccines: Vaccine[]): { [key: string]: Vaccine[] } {
    return vaccines.reduce((acc, vaccine) => {
      const age = vaccine.schedule.age;
      if (!acc[age]) {
        acc[age] = []
      }
      acc[age].push(vaccine);
      return acc;
    }, {} as { [key: string]: Vaccine[] });
  }

  function chunkArray(array: any[], chunkSize: number) {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }

  return (
    <S.Wrapper>
      <ChildrenHeader />
      <S.Content>
        <View style={{ gap: 10, flexDirection: "row", width: "100%", marginBottom: 8 }}>
          <S.Button onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={20} color="white" />
          </S.Button>
          <S.Title>Vacinas</S.Title>
        </View>

        <S.Line />

        {activeChild ? 
          <>
            <S.Row>
              {Buttons.map((text) => (
                <CurveTypeButton
                  key={text}
                  text={text}
                  selected={filter === text}
                  onPress={() => setFilter(text)}
                  allCaps />
              ))}
            </S.Row>

            {filter === 'Próximas' ?
              <S.LegendContainer>
                <LegendItem text='Rede pública' color={determineColor({ isPublic: true })} />
                <LegendItem text='Rede privada' color={determineColor({ isPrivate: true })} />
              </S.LegendContainer>

              :
              <ProgressBar percentage={50} color='#F5CD2F' />
                          
            }

            <S.TableContainer>
              {rows.map((row) => (
                <S.TableRow key={row.age}>
                  <Button text={row.age} color='none' />

                  <S.Column>
                    {row.chunks.map((chunk, chunkIndex) => (
                      <S.Row key={chunkIndex}>
                        {chunk.map((vaccine: Vaccine) => (
                          <Button
                            text={vaccine.vaccine.name}
                            isPrivate={Boolean(vaccine.vaccine.foundInPrivate)}
                            isPublic={Boolean(vaccine.vaccine.foundInPublic)}
                            next={filter === 'Próximas'}
                            status={vaccine.status}
                          />
                        ))}
                      </S.Row>
                    ))}
                  </S.Column>
                </S.TableRow>
              ))}
            </S.TableContainer>
          </>
          :
      <NoChildrenWarning/>
      }
        

        
      </S.Content>
    </S.Wrapper>
  );
};

export default Vacinas;