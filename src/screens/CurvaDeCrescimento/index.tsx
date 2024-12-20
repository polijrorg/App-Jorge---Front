import * as S from './styles';
import React from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Bebe from '@assets/icons/Bebe.png';
import { useChildContext } from '@hooks/useChild';
import ChildrenHeader from '@components/ChildrenHeader';
import ChildCard from '@components/ChildCard';
import { CartesianChart, Line, useChartPressState } from "victory-native";
import { Circle, useFont } from '@shopify/react-native-skia';
import { SharedValue } from 'react-native-reanimated';

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
                        <S.Description>Selecione uma criança na header para ver sua curva de crescimento!</S.Description>
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
                            developmentPercentage={80}
                            vaccinePercentage={80}
                            avatar={Bebe} />

                        <S.Line />

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

                    </S.Content>
                </>
            }

            
        </S.Wrapper>
    )

};

export default ChildGrowthScreen;
