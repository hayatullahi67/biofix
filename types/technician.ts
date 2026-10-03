import type { GeoPoint } from "./hospital";
import type { User } from "./user";

export const technicianSkills = [
  "X-ray",
  "Ultrasound",
  "Lab equipment",
  "Dialysis",
  "Patient monitors",
  "Ventilators",
  "Theatre equipment",
  "Sterilisation",
  "Oxygen systems",
  "Neonatal equipment",
] as const;

export type TechnicianSkill = (typeof technicianSkills)[number];
export type VerificationStatus = "pending" | "verified" | "rejected";

export interface TechnicianDocument {
  id: string;
  kind: "certificate" | "government_id";
  name: string;
  uploadedAt: string;
  previewUrl?: string;
}

export interface TechnicianLocation extends GeoPoint {
  area: string;
  city: string;
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountName: string;
}

export interface Technician extends User {
  role: "technician";
  bio: string;
  skills: TechnicianSkill[];
  location: TechnicianLocation;
  verificationStatus: VerificationStatus;
  rejectionReason?: string;
  rating: number;
  completedJobs: number;
  yearsExperience: number;
  documents: TechnicianDocument[];
  bankAccount?: BankAccount;
}

export interface Review {
  id: string;
  technicianId: string;
  hospitalId: string;
  hospitalName: string;
  jobId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export type TechnicianProfileInput = Pick<Technician, "name" | "phone" | "bio" | "skills"> & {
  area: string;
  city: string;
};
