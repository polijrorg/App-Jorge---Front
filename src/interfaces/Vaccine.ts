export default interface Vaccine {
  id: string;
  vaccinedId: string;
  scheduleId: string;
  childrenId: string;
  status: string;
  date: string;
  vaccine: {
    idvaccine: string;
    name: string;
    prevents: string;
    composition: string;
    indication: string;
    contraindication: string;
    dosage: string;
    administrationRoute: string;
    notes: string;
    foundInPublic: string;
    foundInPrivate: string;
    ageRestriction: string;
  };
  schedule: {
    idschedule: string;
    age: string;
  }
}