import type { JobStatus, JobTab, MachineType, PaymentMethod, TechnicianSkill, Urgency } from "@/types";

export const jobStatusLabels: Record<JobStatus, string> = {
  reported: "Reported",
  open: "Finding technician",
  accepted: "Technician assigned",
  arrived: "Technician on site",
  quoted: "Quote received",
  approved: "Quote approved",
  fixed: "Awaiting confirmation",
  confirmed: "Awaiting payment",
  paid: "Paid",
  disputed: "Disputed",
};

export const jobTimelineLabels: Record<JobStatus, string> = {
  reported: "Fault reported",
  open: "Posted to verified technicians",
  accepted: "Job accepted",
  arrived: "Technician arrived on site",
  quoted: "Quote sent",
  approved: "Quote approved",
  fixed: "Marked as fixed",
  confirmed: "Repair confirmed by hospital",
  paid: "Paid directly to technician",
  disputed: "Dispute opened",
};

export const jobFlow: JobStatus[] = ["reported", "open", "accepted", "arrived", "quoted", "approved", "fixed", "confirmed", "paid"];

export const jobTabStatuses: Record<JobTab, JobStatus[]> = {
  all: [...jobFlow, "disputed"],
  reported: ["reported", "open"],
  in_progress: ["accepted", "arrived", "quoted", "approved"],
  awaiting: ["fixed"],
  completed: ["confirmed", "paid"],
};

export const activeTechnicianStatuses: JobStatus[] = ["accepted", "arrived", "quoted", "approved", "fixed"];
export const completedTechnicianStatuses: JobStatus[] = ["confirmed", "paid", "disputed"];

export const urgencyLabels: Record<Urgency, string> = { low: "Low", medium: "Medium", critical: "Critical" };

export const skillForMachineType: Record<MachineType, TechnicianSkill> = {
  "X-ray machine": "X-ray",
  "Ultrasound scanner": "Ultrasound",
  "Patient monitor": "Patient monitors",
  Ventilator: "Ventilators",
  "Dialysis machine": "Dialysis",
  "Infusion pump": "Patient monitors",
  Defibrillator: "Patient monitors",
  "Anaesthesia machine": "Theatre equipment",
  Autoclave: "Sterilisation",
  "Haematology analyser": "Lab equipment",
  "Oxygen concentrator": "Oxygen systems",
  "ECG machine": "Patient monitors",
  "Infant incubator": "Neonatal equipment",
};

const basePay: Record<Urgency, number> = { low: 35_000, medium: 60_000, critical: 95_000 };

export function estimatePay(urgency: Urgency, type: MachineType): number {
  const premiumTypes: MachineType[] = ["X-ray machine", "Ventilator", "Dialysis machine", "Anaesthesia machine"];
  return basePay[urgency] + (premiumTypes.includes(type) ? 40_000 : 0);
}

export function statusIndex(status: JobStatus): number {
  return jobFlow.indexOf(status);
}

export function hasReached(current: JobStatus, target: JobStatus): boolean {
  return current !== "disputed" && statusIndex(current) >= statusIndex(target);
}

export const paymentMethodLabels: Record<PaymentMethod, string> = { cash: "Cash", bank_transfer: "Bank transfer" };
