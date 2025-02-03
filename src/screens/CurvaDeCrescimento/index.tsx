import * as S from "./styles";
import { useState, useMemo } from "react";
import { ScrollView, View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Bebe from "@assets/icons/Bebe.png";
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

const curveTypeMapping: Record<string, string> = {
  "Estatura (cm)": "altura",
  "Peso (kg)": "peso",
  "IMC": "imc",
};

const percentiles = ["P01", "P3", "P5", "P10", "P15", "P25", "P50", "P75", "P85", "P90", "P95", "P97", "P99"];

const Legend = ({ data }) => {
  return (
    <View style={{ position: "absolute", top: 10, right: 10, backgroundColor: "rgba(255,255,255,0.8)", padding: 5, borderRadius: 5 }}>
      {data.reverse().map((item, index) => (
        <View key={item.label} style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
          <View style={{ width: 10, height: 10, backgroundColor: item.color, marginRight: 5 }} />
          <Text style={{ fontSize: 10 }}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
};

const ChildGrowthScreen = ({ navigation }) => {
  const { activeChild: child } = useChildContext();
  const [curveType, setCurveType] = useState<string>("Estatura (cm)");
  const selectedCurveType = curveTypeMapping[curveType];
  const font = useFont(require("@assets/fonts/Poppins-Regular.ttf"), 12);

  const chartData = useMemo(() => {
    if (!child || !selectedCurveType) return [];

    const genderData = datasets[child.gender]?.[selectedCurveType];
    if (!genderData) return [];

    const dataPoints = [];
    const months = genderData.P01.map((item) => Number.parseFloat(item.month) / 12);

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
    const ageMinus1 = age < 1 ? 0 : age - 1;
    const agePlus1 = age + 1;

    const closestPoints = chartData.reduce((acc, point) => {
      const diffAgeMinus1 = Math.abs(point.x - ageMinus1);
      const diffAgePlus1 = Math.abs(point.x - agePlus1);
      
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
  if (age < 1) return [0, 2]; 
    return [age - 1, age + 1];
  }, [selectedCurveType]);

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
              avatar={Bebe}
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

            <View style={{ height: 300, width: "100%" }}>
              {chartData.length > 0 && (
                <CartesianChart
                  data={chartData}
                  xKey="x"
                  yKeys={percentiles}
                  domain={{ x: xDomain }}
                  xAxis={{
                    font: font, // Usa a fonte carregada
                    lineColor: "hsla(0, 0%, 0%, 0.25)", // Cor da linha do eixo X
                    lineWidth: 1, // Largura da linha do eixo X
                    labelColor: "#000", // Cor do label do eixo X
                    labelOffset: 2, // Offset do label do eixo X
                    labelPosition: "outset", // Posição do label do eixo X
                    axisSide: "bottom", // Lado do gráfico em que o eixo X é renderizado
                    formatXLabel: (label) => `${label}a`, // Formatação dos labels do eixo X
                    linePathEffect: <DashPathEffect intervals={[4, 4]} />, // Efeito da linha do eixo X
                  }}
                  yAxis={[
                    {
                      yKeys: percentiles, // Chaves de dados do eixo Y
                      font: font, // Usa a fonte carregada
                      lineColor: "hsla(0, 0%, 0%, 0.25)", // Cor da linha do eixo Y
                      lineWidth: 1, // Largura da linha do eixo Y
                      labelColor: "#000", // Cor do label do eixo Y
                      labelOffset: 4, // Offset do label do eixo Y
                      labelPosition: "outset", // Posição do label do eixo Y
                      axisSide: "left", // Lado do gráfico em que o eixo Y é renderizado
                      formatYLabel: (label) => `${label}`, // Formatação dos labels do eixo Y
                      domain: yDomain, // Domínio do eixo Y
                      linePathEffect: <DashPathEffect intervals={[4, 4]} />, // Efeito da linha do eixo Y
                    }
                  ]}
                >
                  {({ points }) => (
                    <>
                      {percentiles.map((percentile, index) => (
                        <Line
                          key={percentile}
                          points={points[percentile]}
                          color={`hsl(${index * 30}, 70%, 50%)`}
                          strokeWidth={2}
                          curveType={selectedCurveType === "peso" ? "linear" : "natural"}
                        />
                      ))}
                    </>
                  )}
                </CartesianChart>
              )}
              <Legend data={legendData} />
            </View>

            <S.Description>
              Desenvolvimento está dentro dos padrões esperados para a idade. {child.name.split(' ')[0]} está no <S.GreenText>percentil 50</S.GreenText> para {selectedCurveType}, o que indica que está crescendo de forma saudável e proporcional.
            </S.Description>

            <AddChildButton title="Gerenciar Dados" onPress={() => navigation.navigate("EditCurve")} />
          </S.Content>
        </>
      )}
    </S.Wrapper>
  );
};

export default ChildGrowthScreen;