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

export interface User extends NextAuthUser {
  id: string;
  role: Role;
  status: Status;
  isVerified: boolean;
  name?: string | null;
  email?: string | null;
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
  user: User;
  token?: string;
  message?: string;
}

declare module "next-auth" {
  interface Session {
    user: User;
  }
  interface User extends NextAuthUser {
    id: string;
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
  name: string;
}
