// User related types
export enum UserStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  BANNED = "BANNED",
}

export enum BloodGroup {
  A_POSITIVE = "A_POSITIVE",
  A_NEGATIVE = "A_NEGATIVE",
  B_POSITIVE = "B_POSITIVE",
  B_NEGATIVE = "B_NEGATIVE",
  AB_POSITIVE = "AB_POSITIVE",
  AB_NEGATIVE = "AB_NEGATIVE",
  O_POSITIVE = "O_POSITIVE",
  O_NEGATIVE = "O_NEGATIVE",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
  PREFER_NOT_TO_SAY = "PREFER_NOT_TO_SAY",
}

export enum MaritalStatus {
  SINGLE = "SINGLE",
  MARRIED = "MARRIED",
  DIVORCED = "DIVORCED",
  WIDOWED = "WIDOWED",
  SEPARATED = "SEPARATED",
  OTHER = "OTHER",
}

export interface UserRole {
  id: string;
  name: string;
  description?: string;
}

export interface Profile {
  id: string;
  userId: string;
  bloodGroup?: BloodGroup;
  gender?: Gender;
  designation?: string;
  address?: string;
  location?: string;
  dateOfBirth?: string;
  nationality?: string;
  photo?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  experience?: number;
  qualifications?: string[];
  languages?: string[];
  website?: string;
  linkedIn?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  contactNumber?: string;
  emailAddress?: string;
  maritalStatus?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PatientProfile {
  id: string;
  patientId: string;
  height?: number;
  weight?: number;
  maritalStatus?: MaritalStatus;
  NIDNumber?: string;
  passportNumber?: string;
  anniversaryDate?: string;
  refferalBy?: string;
  initialDiseases?: string[];
  currentDiseases?: string[];
  chiefComplaint?: string;
  observations?: string;
  investigations?: string;
  diagnosis?: string;
  treatmentPlan?: string;
  followUpPlan?: string;
  notes?: string;
  bloodPressure?: string;
  heartRate?: string;
  respiratoryRate?: string;
  temperature?: string;
  bloodSugar?: string;
  medicalConditions?: string;
  bloodCount?: string;
  pulse?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Upload {
  id: string;
  url: string;
  filename: string;
  mimetype?: string;
  size?: number;
}

export interface User {
  id: string;
  username?: string;
  name?: string;
  bio?: string;
  slug?: string;
  email: string;
  phone?: string;
  status: UserStatus;
  emailVerified?: string;
  image?: string;
  lastLogin?: string;
  isBanned: boolean;
  profile?: Profile;
  patientProfile?: PatientProfile;
  banner?: Upload;
  featuredImage?: Upload;
  isVerified: boolean;
  verifiedAt?: string;
  createdAt: string;
  updatedAt: string;
  role?: UserRole;
  roleId?: string;
}

export interface UserResponse {
  status: string;
  user: User;
}

export interface UsersResponse {
  status: string;
  users: User[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}
