export type PaymentMethod = "cash" | "bank_transfer";

export interface JobPayment {
  method: PaymentMethod;
  amount: number;
  paidAt: string;
}

export interface EarningTransaction {
  id: string;
  technicianId: string;
  jobId?: string;
  amount: number;
  method: PaymentMethod;
  description: string;
  createdAt: string;
}

export interface EarningsSummary {
  totalEarned: number;
  awaitingPayment: number;
  paidJobs: number;
}

export interface Dispute {
  id: string;
  jobId: string;
  hospitalName: string;
  technicianName: string;
  reason: string;
  amount: number;
  status: "open" | "resolved";
  createdAt: string;
}
