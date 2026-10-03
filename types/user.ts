import type { TechnicianSkill } from "./technician";

export type UserRole = "hospital_admin" | "nurse" | "technician" | "super_admin";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatarUrl?: string;
  hospitalId?: string;
  ward?: string;
  createdAt: string;
}

export interface Session {
  user: User;
  token: string;
  expiresAt: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface HospitalSignupInput {
  hospitalName: string;
  adminName: string;
  email: string;
  phone: string;
  city: string;
  password: string;
}

export interface TechnicianSignupInput {
  name: string;
  email: string;
  phone: string;
  city: string;
  skills: TechnicianSkill[];
  password: string;
}
