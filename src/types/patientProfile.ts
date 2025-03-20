export enum BloodGroup {
  A_POSITIVE = "A_POSITIVE",
  A_NEGATIVE = "A_NEGATIVE",
  B_POSITIVE = "B_POSITIVE",
  B_NEGATIVE = "B_NEGATIVE",
  O_POSITIVE = "O_POSITIVE",
  O_NEGATIVE = "O_NEGATIVE",
  AB_POSITIVE = "AB_POSITIVE",
  AB_NEGATIVE = "AB_NEGATIVE",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export enum MaritalStatus {
  SINGLE = "SINGLE",
  MARRIED = "MARRIED",
  DIVORCED = "DIVORCED",
  WIDOWED = "WIDOWED",
}

export interface PatientProfile {
  id: string;
  patientId: string | null; // for unique patient id within 6 digits
  userId: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  dateOfBirth: Date | null;
  age: number | null;
  gender: Gender | null;
  emergencyContact: string | null;
  emergencyPhone: string | null;
  relationToEmergencyContact: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
  height: number | null;
  weight: number | null;
  bmi: number | null;
  bloodGroup: BloodGroup | null;
  maritalStatus: MaritalStatus | null;
  NIDNumber: string | null;
  passportNumber: string | null;
  anniversaryDate: Date | null;
  refferalBy: string | null;
  initialDiseases: string[];
  currentDiseases: string[];
  allergies: string[];
  chronicConditions: string[];
  previousSurgeries: string[];
  familyHistory: string | null;
  lifestyle: string | null;
  occupation: string | null;
  vaccinations: Record<string, any> | null;
  insuranceProvider: string | null;
  insurancePolicyNumber: string | null;
  insuranceExpiryDate: Date | null;
  chiefComplaint: string | null;
  observations: string | null;
  investigations: string | null;
  diagnosis: string | null;
  treatmentPlan: string | null;
  followUpPlan: string | null;
  notes: string | null;
  bloodPressure: string | null;
  heartRate: string | null;
  respiratoryRate: string | null;
  temperature: string | null;
  bloodSugar: string | null;
  medicalConditions: string | null;
  bloodCount: string | null;
  pulse: string | null;
  oxygenSaturation: string | null;
  dietaryRestrictions: string | null;
  exerciseRoutine: string | null;
  smokingStatus: string | null;
  alcoholConsumption: string | null;
  medicalDocuments: Record<string, any> | null;
  consentForms: Record<string, any> | null;
  createdAt: Date;
  updatedAt: Date;
  lastVisitDate: Date | null;
  nextAppointmentDate: Date | null;
}
