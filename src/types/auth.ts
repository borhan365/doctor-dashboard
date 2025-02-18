import { User as NextAuthUser } from "next-auth";

export enum Role {
  ADMIN = "ADMIN",
  DOCTOR = "DOCTOR",
  HOSPITAL = "HOSPITAL",
  PHARMACEUTICAL = "PHARMACEUTICAL",
  PATIENT = "PATIENT",
  STAFF = "STAFF",
  ADVERTISER = "ADVERTISER",
}

export enum Status {
  ACTIVE = "ACTIVE",
  PENDING = "PENDING",
  INACTIVE = "INACTIVE",
  BANNED = "BANNED",
}

export interface AuthUser {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  role: Role;
  status: Status;
  isVerified: boolean;
}

export interface Session {
  user: AuthUser;
  expires: string;
}

export interface AuthResponse {
  user: AuthUser;
  token?: string;
  message?: string;
}

declare module "next-auth" {
  interface Session {
    user: AuthUser;
  }

  interface User {
    id: string;
    email: string;
    name: string | null;
    emailVerified: Date | null;
    image: string | null;
    role: Role;
    status: Status;
    isVerified: boolean;
  }
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string | null;
}
