export type PaymentStatus = "held" | "released" | "refunded";

export interface Payment {
  id: string;
  jobId: string;
  hospitalId: string;
  technicianId: string;
  amount: number;
  platformFee: number;
  status: PaymentStatus;
  reference: string;
  createdAt: string;
}

export type TransactionType = "job_payment" | "withdrawal";
export type TransactionStatus = "pending" | "available" | "completed";

export interface EarningTransaction {
  id: string;
  technicianId: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  description: string;
  createdAt: string;
}

export interface EarningsSummary {
  totalEarned: number;
  pending: number;
  available: number;
}

export interface WithdrawInput {
  amount: number;
  bankName: string;
  accountNumber: string;
}

export interface BillingRecord {
  id: string;
  hospitalId: string;
  description: string;
  amount: number;
  status: "paid" | "failed";
  date: string;
}

export interface Payout {
  id: string;
  technicianId: string;
  technicianName: string;
  amount: number;
  status: "processing" | "completed" | "failed";
  bankName: string;
  createdAt: string;
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
