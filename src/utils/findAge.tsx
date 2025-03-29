import Child from "@interfaces/Child";

export default function findAge(comparisonDate: string, activeChild: Child): { years: number, months: number, totalAge?: number } {
  if (!activeChild?.nascimento) return { years: 0, months: 0 };
  
  const [birthDay, birthMonth, birthYear] = activeChild.nascimento.split('/').map(Number);
  const [compDay, compMonth, compYear] = comparisonDate.split('/').map(Number);
  console.log("Datas usadas na conversão: ", birthYear, compYear)
  
  let years = compYear - birthYear;
  let months = compMonth - birthMonth;
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  if (compDay < birthDay) {
    months--;
  }
  
  return { years, months, totalAge: years + months / 12 };
}