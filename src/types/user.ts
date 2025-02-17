export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  DOCTOR = "DOCTOR",
  HOSPITAL = "HOSPITAL",
  STAFF = "STAFF",
  ASSISTANT = "ASSISTANT",
  USER = "USER",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SUSPENDED = "SUSPENDED",
  PENDING = "PENDING",
  BANNED = "BANNED",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export interface User {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  isVerified: boolean;
  image: string | null;
  phone?: string | null;
  banner?: {
    fileUrl: string;
  } | null;
  profile?: {
    bloodGroup: string | null;
    gender: Gender | null;
    designation: string | null;
    address: string | null;
    location: string | null;
    bio: string | null;
  } | null;
  role: UserRole;
  status: UserStatus;
  doctorProfile?: {
    id: string;
    name: string;
    email: string;
    image: string;
  } | null;
} 