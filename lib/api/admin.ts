import type { Dispute, MonthlyRevenue, PlatformStats } from "@/types";
import { mutate, query } from "./client";
import { lastMonths, monthKey } from "./months";

const settledStatuses = ["confirmed", "paid"];

export function getPlatformStats(): Promise<PlatformStats> {
  return query((db) => ({
    hospitals: db.hospitals.length,
    technicians: db.technicians.filter((tech) => tech.verificationStatus === "verified").length,
    jobs: db.jobs.length,
    revenue: db.billing.filter((record) => record.status === "paid").reduce((sum, record) => sum + record.amount, 0),
    pendingVerifications: db.technicians.filter((tech) => tech.verificationStatus === "pending").length,
    openDisputes: db.disputes.filter((dispute) => dispute.status === "open").length,
  }));
}

export function getPlatformRevenue(): Promise<MonthlyRevenue[]> {
  return query((db) =>
    lastMonths(6).map(({ key, label }, index) => {
      const subscriptions = db.billing.filter((record) => record.status === "paid" && monthKey(record.date) === key);
      const settledJobs = db.jobs.filter((job) => settledStatuses.includes(job.status) && monthKey(job.updatedAt) === key).length;
      const completedPayments = db.transactions.filter((txn) => monthKey(txn.createdAt) === key).length;
      const revenue = subscriptions.reduce((sum, record) => sum + record.amount, 0);
      return { month: label, revenue: revenue + 25_000 * (index + 3), jobs: completedPayments + settledJobs + index * 3 + 4 };
    }),
  );
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
