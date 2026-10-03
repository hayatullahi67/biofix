import type { BillingRecord, Dispute, EarningTransaction, Payout } from "@/types";
import { daysAgo } from "./dates";

type TxRow = [type: EarningTransaction["type"], amount: number, status: EarningTransaction["status"], description: string, days: number];

const txRows: TxRow[] = [
  ["job_payment", 95_000, "available", "Defibrillator repair, Grace Specialist Hospital", 19],
  ["job_payment", 100_000, "available", "ICU ventilator fan repair, Grace Specialist Hospital", 39],
  ["withdrawal", 150_000, "completed", "Withdrawal to GTBank ••••7811", 35],
  ["job_payment", 72_000, "available", "Patient monitor calibration, Harmony Medical Centre", 52],
  ["job_payment", 130_000, "available", "Anaesthesia machine service, Unity Specialist Hospital", 70],
  ["withdrawal", 180_000, "completed", "Withdrawal to GTBank ••••7811", 66],
  ["job_payment", 88_000, "available", "Oxygen concentrator repair, Riverside Children's Clinic", 95],
  ["job_payment", 115_000, "available", "Theatre light and table repair, Harmony Medical Centre", 125],
  ["job_payment", 64_000, "available", "Infusion pump servicing (4 units), Grace Specialist Hospital", 150],
  ["withdrawal", 200_000, "completed", "Withdrawal to GTBank ••••7811", 140],
];

export const seedTransactions: EarningTransaction[] = txRows.map(([type, amount, status, description, days], index) => ({
  id: `txn-${index + 1}`,
  technicianId: "tech-1",
  type,
  amount,
  status,
  description,
  createdAt: daysAgo(days),
}));

export const seedBilling: BillingRecord[] = [0, 1, 2, 3, 4, 5].map((month) => ({
  id: `bill-${month + 1}`,
  hospitalId: "hosp-1",
  description: "Biofix Premium, monthly subscription",
  amount: 25_000,
  status: month === 4 ? "failed" : "paid",
  date: daysAgo(month * 30 + 2),
}));

export const seedPayouts: Payout[] = [
  { id: "pay-1", technicianId: "tech-1", technicianName: "Emeka Obi", amount: 150_000, status: "completed", bankName: "GTBank", createdAt: daysAgo(35) },
  { id: "pay-2", technicianId: "tech-2", technicianName: "Ibrahim Musa", amount: 240_000, status: "completed", bankName: "Access Bank", createdAt: daysAgo(12) },
  { id: "pay-3", technicianId: "tech-3", technicianName: "Kelechi Nnamdi", amount: 90_000, status: "processing", bankName: "Zenith Bank", createdAt: daysAgo(1) },
  { id: "pay-4", technicianId: "tech-4", technicianName: "Yetunde Alabi", amount: 85_500, status: "processing", bankName: "First Bank", createdAt: daysAgo(2) },
  { id: "pay-5", technicianId: "tech-5", technicianName: "Samuel Ojo", amount: 60_000, status: "failed", bankName: "UBA", createdAt: daysAgo(6) },
];

export const seedDisputes: Dispute[] = [
  { id: "dsp-1", jobId: "job-15", hospitalName: "Grace Specialist Hospital", technicianName: "Samuel Ojo", reason: "Oxygen purity indicator still amber after repair.", amount: 35_000, status: "open", createdAt: daysAgo(3) },
  { id: "dsp-2", jobId: "job-hist-9", hospitalName: "Harmony Medical Centre", technicianName: "Kelechi Nnamdi", reason: "Part invoiced was not fitted.", amount: 48_000, status: "resolved", createdAt: daysAgo(41) },
];
