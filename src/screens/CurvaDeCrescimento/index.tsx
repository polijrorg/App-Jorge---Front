import * as S from './styles';
import React, { useState } from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Bebe from '@assets/icons/Bebe.png';
import { useChildContext } from '@hooks/useChild';
import ChildrenHeader from '@components/ChildrenHeader';
import ChildCard from '@components/ChildCard';
import { CartesianChart, Line, useChartPressState } from "victory-native";
import { Circle, useFont } from '@shopify/react-native-skia';
import { SharedValue } from 'react-native-reanimated';
import AddChildButton from '@components/AddChildButton';
import NoChildrenWarning from '@components/NoChildrenWarning';

const ChildGrowthScreen = ({ navigation }) => {
    const { activeChild: child } = useChildContext();

    const DATA = Array.from({ length: 31 }, (_, i) => ({
        day: i,
        highTmp: 40 + 30 * Math.random(),
    }));

    function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
        return <Circle cx={x} cy={y} r={8} color="black" />;
    }

    const { state, isActive } = useChartPressState({ x: 0, y: { highTmp: 0 } });
    const font = useFont(require('@assets/fonts/Poppins-Regular.ttf'), 12);

    const [curveType, setCurveType] = useState<string>('Estatura (m) x Idade (anos)')
    const Buttons = ['Estatura (m) x Idade (anos)', 'Peso (kg) x Idade (anos)']

    function CurveTypeButton({ text }: { text: string }) {
      return (
        <S.ButtonContainer selected={curveType === text} onPress={() => setCurveType(text)}>
          <S.ButtonText selected={curveType === text}>{text}</S.ButtonText>
        </S.ButtonContainer>
      )
    }

    return (
        <S.Wrapper>

            {!child ?
                <>
                    <ChildrenHeader />
                    <S.Content>
                        <View style={{ gap: 10, flexDirection: 'row', width: '100%', marginBottom: 8 }}>
                            <S.Button onPress={() => navigation.goBack()}>
                                <Ionicons name="arrow-back-outline" size={20} color="white" />
                            </S.Button>
                            <S.Title>Curva de Crescimento</S.Title>
                        </View>
                        <S.Line />
                        <NoChildrenWarning />
                    </S.Content>
                </>
            :
                <>
                    <ChildrenHeader />
                    
                    <S.Content>
                        <View style={{ gap: 10, flexDirection: 'row', width: '100%', marginBottom: 8 }}>
                            <S.Button onPress={() => navigation.goBack()}>
                                <Ionicons name="arrow-back-outline" size={20} color="white" />
                            </S.Button>
                            <S.Title>Curva de Crescimento</S.Title>
                        </View>

                        <ChildCard
                            isEditable={false}
                            name={child?.name || 'name'}
                            birthDate={child?.nascimento || ''}
                            weight={`${child?.peso}kg` || 'weight'}
                            height={`${child?.altura}cm` || 'height'}
                            id={`${child?.idchildren}` || '0'}
                            vaccinePercentage={80}
                            avatar={Bebe} />

                        <S.Line />

                        <S.Row>
                          {Buttons.map(text => (
                            <CurveTypeButton key={text} text={text}/>
                          ))}
                        </S.Row>

                        <View style={{ height: 300, width: '100%' }}>
                          <CartesianChart
                              data={DATA}
                              xKey="day"
                              yKeys={["highTmp"]}
                              axisOptions={{
                              font,
                              }}
                              chartPressState={state}
                          >
                              {({ points }) => (
                              <>
                                  <Line points={points.highTmp} color="red" strokeWidth={3} />
                                  {isActive && (
                                  <ToolTip x={state.x.position} y={state.y.highTmp.position} />
                                  )}
                              </>
                              )}
                          </CartesianChart>
                        </View>

                        <AddChildButton title='Gerenciar Dados' onPress={() => navigation.navigate('EditCurve')}/>

                    </S.Content>
                </>
            }

            
        </S.Wrapper>
    )

};

export default ChildGrowthScreen;
