import GrowthData from "@interfaces/GrowthData";
import datasets from "@services/DefaultCurves/datasets";
import findAge from "./findAge";
import Child from "@interfaces/Child";

const curveTypeMapping: Record<string, string> = {
  "Estatura (cm)": "altura",
  "Peso (kg)": "peso",
  "IMC": "imc",
};

const percentiles = ["P3", "P15", "P50", "P85", "P97"];

function determineGrowthData(item: GrowthData, curveType: string) {
  switch (curveType) {
    case 'Estatura (cm)': return item?.height;
    case 'Peso (kg)': return item?.weight;
    case 'IMC': return item?.imc;
  }
}

const findClosestPercentile = (curveType: string, child: Child, growthData: GrowthData[]) => {
  if (!curveType || !child || !growthData) return 'oops';
  const selectedCurveType = curveTypeMapping[curveType];
  const genderData = datasets[child.gender][selectedCurveType];
  if (!genderData) return "N/A";

  const latestData = growthData[growthData.length - 1];
  // console.log("Data usado: ", latestData);
  // console.log("lista de datas: ", growthData);

  const measure = determineGrowthData(latestData, curveType);
  // console.log("Measure: ", measure);

  const dataAge = 12 * findAge(latestData?.growthDate, child).totalAge;
  // console.log("Idade em meses: ", dataAge);
  if (dataAge < 0) return 'idade negativa :('

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

  // console.log(closestPercentile);
  return closestPercentile;
};

export default findClosestPercentile;