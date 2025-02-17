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

export interface AuthUser extends Omit<NextAuthUser, "email"> {
  id: string;
  role: Role;
  status: Status;
  isVerified: boolean;
  name?: string | null;
  email: string;
  image?: string | null;
}

export interface Session {
  user: {
    id: string;
    email: string;
    name?: string;
    image?: string;
    role: Role;
    status: Status;
  };
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
    role: Role;
    status: Status;
    isVerified: boolean;
    name?: string | null;
    image?: string | null;
  }
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}
