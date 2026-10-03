import type { Dispute, MonthlyRevenue, Payout, PlatformStats } from "@/types";
import { mutate, query } from "./client";
import { lastMonths, monthKey } from "./months";

const PLATFORM_FEE = 0.1;
const settledStatuses = ["confirmed", "paid"];

export function getPlatformStats(): Promise<PlatformStats> {
  return query((db) => ({
    hospitals: db.hospitals.length,
    technicians: db.technicians.filter((tech) => tech.verificationStatus === "verified").length,
    jobs: db.jobs.length,
    revenue:
      db.billing.filter((record) => record.status === "paid").reduce((sum, record) => sum + record.amount, 0) +
      db.transactions.filter((txn) => txn.type === "job_payment").reduce((sum, txn) => sum + txn.amount * PLATFORM_FEE, 0),
    pendingVerifications: db.technicians.filter((tech) => tech.verificationStatus === "pending").length,
    openDisputes: db.disputes.filter((dispute) => dispute.status === "open").length,
  }));
}

export function getPlatformRevenue(): Promise<MonthlyRevenue[]> {
  return query((db) =>
    lastMonths(6).map(({ key, label }, index) => {
      const payments = db.transactions.filter((txn) => txn.type === "job_payment" && monthKey(txn.createdAt) === key);
      const subscriptions = db.billing.filter((record) => record.status === "paid" && monthKey(record.date) === key);
      const settledJobs = db.jobs.filter((job) => settledStatuses.includes(job.status) && monthKey(job.updatedAt) === key).length;
      const revenue = payments.reduce((sum, txn) => sum + txn.amount * PLATFORM_FEE, 0) + subscriptions.reduce((sum, record) => sum + record.amount, 0);
      return { month: label, revenue: revenue + 40_000 * (index + 2), jobs: payments.length + settledJobs + index * 3 + 4 };
    }),
  );
}

export function listPayouts(): Promise<Payout[]> {
  return query((db) => [...db.payouts].sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
}

export function listDisputes(): Promise<Dispute[]> {
  return query((db) => [...db.disputes].sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
}

export function resolveDispute(id: string): Promise<void> {
  return mutate((db) => {
    const dispute = db.disputes.find((candidate) => candidate.id === id);
    if (dispute) dispute.status = "resolved";
  });
}
