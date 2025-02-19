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
import { ReadAndAgree } from "@components/ReadAndAgree";

const curveTypeMapping: Record<string, string> = {
  "Estatura (cm)": "altura",
  "Peso (kg)": "peso",
  "IMC": "imc",
};

const percentiles = ["P01", "P3", "P5", "P10", "P15", "P25", "P50", "P75", "P85", "P90", "P95", "P97", "P99"];

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
  const [defaultCurves, setDefaultCurves] = useState<boolean>(false);
  const [childData, setChildData] = useState<any[]>([]);
  const selectedCurveType = curveTypeMapping[curveType];
  const font = useFont(require("@assets/fonts/Poppins-Regular.ttf"), 12);

  async function fetchData() {
    let data = await GrowthDataService.getByChild(child.idchildren);
    if (data.length > 0) {
      data = data.sort((a, b) => {
        const ageA = a.age.years + a.age.months / 12;
        const ageB = b.age.years + b.age.months / 12;
        return ageB - ageA;
      });
    }
    setGrowthData(data);
  }

  const findClosestPercentile = () => {
    const genderData = datasets[child.gender]?.[curveType];
    if (!genderData) return "N/A";

    const latestData = growthData[growthData.length - 1];
    console.log("data mais recente -> ", latestData);

    const measure = () => {
      switch (curveType) {
        case 'Estatura (cm)': return Number(latestData.height);
        case 'Peso (kg)': return Number(latestData.weight);
        case 'IMC': return Number(latestData.imc);
      }
    }

    const dataAge = latestData.age.months + latestData.age.years * 12;
  
    let closestPercentile = "N/A";
    let minDifference = Infinity;
  
    for (const percentile of percentiles) {
      const percentileData = genderData[percentile];
      const percentileValue = Number(percentileData[dataAge][percentile.toLowerCase()].replace(',', '.'));
      const difference = Math.abs(measure() - percentileValue);
  
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
      console.log(dataPoints);
    });

    return dataPoints;
  }, [child, selectedCurveType]);

  const combinedChartData = useMemo(() => {
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
  
    if (childData.length > 0) {
      childData.forEach(childPoint => {
        const existingPointIndex = dataPoints.findIndex(point => point.x === childPoint.x);
        if (existingPointIndex !== -1) {
          dataPoints[existingPointIndex]['childY'] = childPoint.y;
        } else {
          dataPoints.push({ x: childPoint.x, childY: childPoint.y });
        }
      });
    }
  
    return dataPoints;
  }, [child, selectedCurveType, childData]);

  const yDomain: [number, number] = useMemo(() => {
    if (!chartData.length) return [0, 100];

    const age = findFloatAge(child?.nascimento);
    const rightLimit = age < 2 ? 2 : 5;

    const closestPoints = chartData.reduce((acc, point) => {
      const diffAgeMinus1 = Math.abs(point.x - 0);
      const diffAgePlus1 = Math.abs(point.x - rightLimit);
      
      if (diffAgeMinus1 < acc.minDiffAgeMinus1) {
        acc.minDiffAgeMinus1 = diffAgeMinus1;
        acc.p01Value = point.P01;
      }
      
      if (diffAgePlus1 < acc.minDiffAgePlus1) {
        acc.minDiffAgePlus1 = diffAgePlus1;
        acc.p99Value = point.P99;
      }
  
      return acc;
    }, { minDiffAgeMinus1: Infinity, minDiffAgePlus1: Infinity, p01Value: 0, p99Value: 100});

    const minY = closestPoints.p01Value * 0.9;
    const maxY = closestPoints.p99Value * 1.1;

    return [minY, maxY];
  }, [chartData, child, selectedCurveType]);

  const xDomain: [number, number] = useMemo(() => {
    let age = findFloatAge(child?.nascimento);
  if (age < 2) return [0, 2]; 
    return [0, 5];
  }, [selectedCurveType]);

  useEffect(() => {
    fetchData();
  }, []);

  function determineGrowthData(item: GrowthData) {
    switch (curveType) {
      case 'Estatura (cm)': return item.height;
      case 'Peso (kg)': return item.weight;
      case 'IMC': return item.imc;
    }
  }

  useEffect(() => {
    async function fetchData() {
        if (!child || !selectedCurveType) return;
        try {
            const response: GrowthData[] = await GrowthDataService.getByChild(child.idchildren);
            if (!response || response.length === 0) return;
            const data = response.map(item => ({
                x: item.age.years + item.age.months / 12,
                y: determineGrowthData(item),
            }));
            setChildData(data);
        } catch (error) {
            console.error("Error fetching growth data:", error);
        }
    }
    fetchData();
    console.log(childData);
}, [child, selectedCurveType, curveType]);

  const legendData = percentiles.map((percentile, index) => ({
    label: percentile,
    color: `hsl(${index * 30}, 70%, 50%)`,
  }));

  function findFloatAge(birthDate: string): number {
    if (birthDate == null) return 0;
    const [day, month, year] = birthDate.split('-').map(Number);
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

  const Buttons = Object.keys(curveTypeMapping);

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
              vaccinePercentage={80}
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

            <S.Row>
              <ReadAndAgree
                isChecked={defaultCurves}
                blueText={undefined}
                blackText='Mostrar curvas padrão?'
                onPress={() => setDefaultCurves(!defaultCurves)}
                onTextPress={undefined}
              />
            </S.Row>

            <View style={{ height: 300, width: "100%" }}>
              {combinedChartData.length > 0 && (
                <CartesianChart
                  data={combinedChartData}
                  xKey="x"
                  yKeys={defaultCurves ? [...percentiles, "childY"] : ["childY"]}
                  domain={{ x: xDomain }}
                  xAxis={{
                    font: font,
                    lineColor: "hsla(0, 0%, 0%, 0.25)",
                    lineWidth: 1,
                    formatXLabel: (label) => `${label}a`,
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
                      domain: yDomain,
                      linePathEffect: <DashPathEffect intervals={[4, 4]} />,
                    },
                  ]}
                >
                  {({ points }) => (
                    <>
                      {defaultCurves && percentiles.map((percentile, index) => (
                        <Line
                          key={percentile}
                          points={points[percentile]}
                          color={`hsla(${index * 30}, 70%, 50%, 20%)`}
                          strokeWidth={2}
                          curveType="natural"
                        />
                      ))}
                      {points.childY && (
                        <Line
                          key="childData"
                          points={points.childY}
                          color="blue"
                          strokeWidth={2}
                          curveType="linear"
                        />
                      )}
                    </>
                  )}
                </CartesianChart>
              )}
              {
                defaultCurves && 
                <Legend data={legendData} />
              }
            </View>


            {growthData.length > 0 &&
              <S.Description>
                Desenvolvimento está dentro dos padrões esperados para a idade. {child.name.split(' ')[0]} está no <S.GreenText>percentil {findClosestPercentile()}</S.GreenText> para {selectedCurveType}, o que indica que está crescendo de forma saudável e proporcional.
              </S.Description>
            }

            <AddChildButton title="Gerenciar Dados" onPress={() => navigation.navigate("EditCurve")} />
          </S.Content>
        </>
      )}
    </S.Wrapper>
  );
};

export default ChildGrowthScreen;