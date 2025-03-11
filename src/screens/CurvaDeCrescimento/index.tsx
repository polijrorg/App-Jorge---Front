import * as S from "./styles";
import { useState, useMemo, useEffect } from "react";
import { View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useChildContext } from "@hooks/useChild";
import ChildrenHeader from "@components/ChildrenHeader";
import ChildCard from "@components/ChildCard";
import { CartesianChart, Line } from "victory-native";
import AddChildButton from "@components/AddChildButton";
import NoChildrenWarning from "@components/NoChildrenWarning";
import datasets from "@services/DefaultCurves/datasets";
import CurveTypeButton from "@components/CurveTypeButton";
import { DashPathEffect, useFont } from "@shopify/react-native-skia"
import React from "react";
import GrowthDataService from "@services/GrowthDataService";
import GrowthData from "@interfaces/GrowthData";

const curveTypeMapping: Record<string, string> = {
  "Estatura (cm)": "altura",
  "Peso (kg)": "peso",
  "IMC": "imc",
};

const percentiles = ["P3", "P15", "P50", "P85", "P97"];

const Legend = ({ data }) => {
  return (
    <View style={{ position: "absolute", top: 10, right: 10, backgroundColor: "rgba(255,255,255,0.8)", padding: 5, borderRadius: 5 }}>
      {data.reverse().map((item) => (
        <View key={item.label} style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
          <View style={{ width: 10, height: 10, backgroundColor: item.color, marginRight: 5 }} />
          <Text style={{ fontSize: 10 }}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
};

const ChildGrowthScreen = ({ navigation }) => {
  const { activeChild: child, setGrowthData, growthData } = useChildContext();
  const [curveType, setCurveType] = useState<string>("Estatura (cm)");
  const [childData, setChildData] = useState<any[]>([]);
  const selectedCurveType = curveTypeMapping[curveType];
  const Buttons = Object.keys(curveTypeMapping);
  const font = useFont(require("@assets/fonts/Poppins-Regular.ttf"), 12);

  useEffect(() => {
    fetchData();
  }, [child, selectedCurveType]);
  
  useEffect(() => {
    convertData();
  }, [growthData, selectedCurveType]);  

  async function fetchData() {
    let data = await GrowthDataService.getByChild(child.idchildren);
    if (data.length > 0) {
      data = data.sort((a, b) => {
        const ageA = a.age.years + a.age.months / 12;
        const ageB = b.age.years + b.age.months / 12;
        return ageA - ageB;
      });
    }
    setGrowthData(data);
  }

  async function convertData() {
    if (!child || !selectedCurveType) return;
    try {
        if (!growthData || growthData.length === 0) {
          console.log("growthData está vazio");
          return;
        }
        const data = growthData.map(item => ({
            x: item.age.years + item.age.months / 12,
            y: determineGrowthData(item),
        }));
        setChildData(data);
    } catch (error) {
        console.error("Error fetching growth data:", error);
    }
  }

  const findClosestPercentile = () => {
    const genderData = datasets[child.gender][selectedCurveType];
    if (!genderData) return "N/A";

    const latestData = growthData[growthData.length - 1];

    const measure = determineGrowthData(latestData);

    const dataAge = latestData.age.months + latestData.age.years * 12;
  
    let closestPercentile = "N/A";
    let minDifference = Infinity;
  
    for (const percentile of percentiles) {
      const percentileData = genderData[percentile];
      const percentileValue = Number(percentileData[dataAge][percentile.toLowerCase()].replace(',', '.'));
      const difference = Math.abs(measure - percentileValue);
  
      if (difference < minDifference) {
        minDifference = difference;
        closestPercentile = percentile;
      }
    }
  
    return closestPercentile;
  };

  const chartData = useMemo(() => {
    if (!child || !selectedCurveType) return [];

    const genderData = datasets[child.gender]?.[selectedCurveType];
    if (!genderData) return [];

    const dataPoints = [];
    const months = genderData.P50.map((item) => Number.parseFloat(item.month) / 12);

    months.forEach((month, index) => {
      const point = { x: month };
      percentiles.forEach((percentile) => {
        point[percentile] = Number.parseFloat(genderData[percentile][index][percentile.toLowerCase()].replace(',', '.'));
      });
      dataPoints.push(point);
    });

    return dataPoints;
  }, [child, selectedCurveType]);

  const yDomain: [number, number] = useMemo(() => {
    if (!chartData.length) return [0, 100];

    const age = findFloatAge(child?.nascimento);
    const rightLimit = age < 2 ? 2 : 5;

    const closestPoints = chartData.reduce((acc, point) => {
      const diffAgeMinus1 = Math.abs(point.x - 0);
      const diffAgePlus1 = Math.abs(point.x - rightLimit);
      
      if (diffAgeMinus1 < acc.minDiffAgeMinus1) {
        acc.minDiffAgeMinus1 = diffAgeMinus1;
        acc.p01Value = point.P3;
      }
      
      if (diffAgePlus1 < acc.minDiffAgePlus1) {
        acc.minDiffAgePlus1 = diffAgePlus1;
        acc.p99Value = point.P97;
      }
  
      return acc;
    }, { minDiffAgeMinus1: Infinity, minDiffAgePlus1: Infinity, p01Value: 0, p99Value: 100});

    const minY = closestPoints.p01Value * 0.98;
    const maxY = closestPoints.p99Value * 1.1;

    return [minY, maxY];
  }, [chartData, child, selectedCurveType]);

  const xDomain: [number, number] = useMemo(() => {
    let age = findFloatAge(child?.nascimento);
    if (age < 1) {
      return [0, 1];
    } else if (age < 2) {
      return [0, 2];
    } else {
      return [0, 5];
    }
  }, [selectedCurveType]);

  function determineGrowthData(item: GrowthData) {
    switch (curveType) {
      case 'Estatura (cm)': return item.height;
      case 'Peso (kg)': return item.weight;
      case 'IMC': return item.imc;
    }
  }

  const legendData = percentiles.map((percentile, index) => ({
    label: percentile,
    color: `hsl(${index * 30}, 70%, 50%)`,
  }));

  function findFloatAge(birthDate: string): number {
    if (birthDate == null) return 0;
    const [day, month, year] = birthDate.split('/').map(Number);
    const today = new Date();
    let years = today.getFullYear() - year;
    let months = today.getMonth() - month + 1;
    let days = today.getDate() - day;
    
    if (days < 0) {
        months--;
        days += new Date(year, month, 0).getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    const ageInYears = years + months / 12 + days / 365;
    return parseFloat(ageInYears.toFixed(2));
  }

  return (
    <S.Wrapper>
      {!child ? (
        <>
          <ChildrenHeader />
          <S.Content>
            <View style={{ gap: 10, flexDirection: "row", width: "100%", marginBottom: 8 }}>
              <S.Button onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back-outline" size={20} color="white" />
              </S.Button>
              <S.Title>Curva de Crescimento</S.Title>
            </View>
            <S.Line />
            <NoChildrenWarning />
          </S.Content>
        </>
      ) : (
        <>
          <ChildrenHeader />
          <S.Content>
            <View style={{ gap: 10, flexDirection: "row", width: "100%", marginBottom: 8 }}>
              <S.Button onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back-outline" size={20} color="white" />
              </S.Button>
              <S.Title>Curva de Crescimento</S.Title>
            </View>

            <ChildCard
              isEditable={false}
              name={child?.name || "name"}
              birthDate={child?.nascimento || ""}
              weight={`${child?.peso}kg` || "weight"}
              height={`${child?.altura}cm` || "height"}
              id={`${child?.idchildren}` || "0"}
              gender={child.gender}
            />

            <S.Line />

            <S.Row>
                {Buttons.map((text) => (
                  <CurveTypeButton
                    key={text}
                    text={text}
                    selected={curveType === text}
                    onPress={() => setCurveType(text)}
                  />
                ))}
            </S.Row>

            <View style={{ height: 300, width: "100%", position: "relative" }}>
              {(
                <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
                  <CartesianChart
                    data={chartData}
                    xKey="x"
                    yKeys={[...percentiles]}
                    domain={{ x: xDomain, y: yDomain }}
                    xAxis={{
                      font: font,
                      lineColor: "hsla(0, 0%, 0%, 0.25)",
                      lineWidth: 1,
                      formatXLabel: (label) => {
                        if (findFloatAge(child?.nascimento) < 1) {
                          // Exibir em meses quando a criança tem menos de 1 ano
                          const months = Math.floor(label * 12);
                          return `${months}m`;
                        } else {
                          // Exibir em anos quando a criança tem mais de 1 ano
                          return `${label}a`;
                        }
                      },
                      tickValues: findFloatAge(child?.nascimento) < 1 ? 
                        Array.from({ length: 12 }, (_, i) => (i + 1) / 12) :
                        undefined,
                      linePathEffect: <DashPathEffect intervals={[4, 4]} />,
                    }}
                    yAxis={[
                      {
                        font: font,
                        lineColor: "hsla(0, 0%, 0%, 0.25)",
                        lineWidth: 1,
                        labelColor: "#000",
                        axisSide: "left",
                        formatYLabel: (label) => `${label}`,
                        linePathEffect: <DashPathEffect intervals={[4, 4]} />,
                      },
                    ]}
                  >
                    {({ points }) =>
                      percentiles.map((percentile, index) => (
                        <Line
                          key={percentile}
                          points={points[percentile]}
                          color={`hsla(${index * 30}, 70%, 50%, 20%)`}
                          strokeWidth={2}
                          curveType="natural"
                        />
                      ))
                    }
                  </CartesianChart>
                </View>
              )}

              {growthData.length > 0 && (
                <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
                  <CartesianChart
                    data={childData}
                    xKey="x"
                    yKeys={["y"]}
                    domain={{ x: xDomain, y: yDomain }}
                    yAxis={[
                      {
                        font: font,
                        labelColor: "rgba(0, 0, 0, 0)",
                        axisSide: "left",
                        formatYLabel: (label) => `${label}`,
                        linePathEffect: <DashPathEffect intervals={[4, 4]} />,
                      },
                    ]}
                  >
                    {({ points }) => (
                      <Line
                        key="childData"
                        points={points.y}
                        color="blue"
                        strokeWidth={3}
                        curveType="linear"
                      />
                    )}
                  </CartesianChart>
                </View>
              )}

              <Legend data={legendData} />
            </View>


            {growthData.length > 0 ?
              <S.Description>
                Desenvolvimento está dentro dos padrões esperados para a idade. {child.name.split(' ')[0]} está no <S.GreenText>percentil {findClosestPercentile()}</S.GreenText> para {selectedCurveType}, o que indica que está crescendo de forma saudável e proporcional.
              </S.Description>
              :
              <S.Description>
                Adicione abaixo os dados de crescimento de seu filho para comparar com a média mundial!
              </S.Description>
            }

            <AddChildButton title="Adicionar Dados" onPress={() => navigation.navigate("EditCurve")} />
          </S.Content>
        </>
      )}
    </S.Wrapper>
  );
};

export default ChildGrowthScreen;