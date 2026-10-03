import type { Hospital } from "./hospital";
import type { Machine } from "./machine";
import type { Technician } from "./technician";
import type { User } from "./user";

export const faultCategories = [
  "Won't turn on",
  "Error on screen",
  "Strange noise",
  "Physical damage",
  "Not accurate",
  "Other",
] as const;

export type FaultCategory = (typeof faultCategories)[number];
export type Urgency = "low" | "medium" | "critical";

export interface FaultReport {
  id: string;
  machineId: string;
  reportedBy: string;
  photos: string[];
  category: FaultCategory;
  description: string;
  urgency: Urgency;
  createdAt: string;
}

export type NewFaultReportInput = Omit<FaultReport, "id" | "createdAt">;

export type JobStatus =
  | "reported"
  | "open"
  | "accepted"
  | "arrived"
  | "quoted"
  | "approved"
  | "fixed"
  | "confirmed"
  | "paid"
  | "disputed";

export interface QuotePart {
  name: string;
  price: number;
}

export interface Quote {
  parts: QuotePart[];
  labour: number;
  total: number;
  note?: string;
  sentAt: string;
}

export type QuoteInput = Omit<Quote, "total" | "sentAt">;

export interface JobTimelineEvent {
  id: string;
  status: JobStatus;
  label: string;
  at: string;
  actor?: string;
}

export interface FixReport {
  notes: string;
  partsUsed: string;
  beforePhotos: string[];
  afterPhotos: string[];
  submittedAt: string;
}

export type FixReportInput = Omit<FixReport, "submittedAt">;

export interface Job {
  id: string;
  faultReportId: string;
  machineId: string;
  hospitalId: string;
  technicianId?: string;
  status: JobStatus;
  quote?: Quote;
  fixReport?: FixReport;
  timeline: JobTimelineEvent[];
  estimatedPay: number;
  rating?: number;
  createdAt: string;
  updatedAt: string;
}

export interface JobDetails extends Job {
  machine: Machine;
  hospital: Hospital;
  report: FaultReport;
  reporter?: User;
  technician?: Technician;
  distanceKm?: number;
}

export type JobTab = "all" | "reported" | "in_progress" | "awaiting" | "completed";

export interface ReportSummary {
  report: FaultReport;
  machine: Machine;
  jobId: string;
  jobStatus: JobStatus;
}
