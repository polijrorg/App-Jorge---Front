export default interface GrowthData {
  id: string,
  weight: number,
  height: number,
  growthDate: string,
  imc: number,
  age: {
    years: number,
    months: number,
  }
}