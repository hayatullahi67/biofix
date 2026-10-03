import type { BillingRecord, Dispute, EarningTransaction, PaymentMethod } from "@/types";
import { daysAgo } from "./dates";

type TxRow = [amount: number, method: PaymentMethod, description: string, days: number];

const txRows: TxRow[] = [
  [95_000, "bank_transfer", "Defibrillator repair, Grace Specialist Hospital", 19],
  [100_000, "bank_transfer", "ICU ventilator fan repair, Grace Specialist Hospital", 39],
  [72_000, "cash", "Patient monitor calibration, Harmony Medical Centre", 52],
  [130_000, "bank_transfer", "Anaesthesia machine service, Unity Specialist Hospital", 70],
  [88_000, "cash", "Oxygen concentrator repair, Riverside Children's Clinic", 95],
  [115_000, "bank_transfer", "Theatre light and table repair, Harmony Medical Centre", 125],
  [64_000, "cash", "Infusion pump servicing (4 units), Grace Specialist Hospital", 150],
];

export const seedTransactions: EarningTransaction[] = txRows.map(([amount, method, description, days], index) => ({
  id: `txn-${index + 1}`,
  technicianId: "tech-1",
  amount,
  method,
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

export const seedDisputes: Dispute[] = [
  { id: "dsp-1", jobId: "job-15", hospitalName: "Grace Specialist Hospital", technicianName: "Samuel Ojo", reason: "Oxygen purity indicator still amber after repair.", amount: 35_000, status: "open", createdAt: daysAgo(3) },
  { id: "dsp-2", jobId: "job-hist-9", hospitalName: "Harmony Medical Centre", technicianName: "Kelechi Nnamdi", reason: "Part invoiced was not fitted.", amount: 48_000, status: "resolved", createdAt: daysAgo(41) },
];
