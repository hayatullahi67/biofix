import type { Dispute, MonthlyCount, PlatformStats } from "@/types";
import { mutate, query } from "./client";
import { lastMonths, monthKey } from "./months";

const completedStatuses = ["confirmed", "paid"];

export function getPlatformStats(): Promise<PlatformStats> {
  return query((db) => ({
    hospitals: db.hospitals.length,
    technicians: db.technicians.filter((tech) => tech.verificationStatus === "verified").length,
    jobs: db.jobs.length,
    machines: db.machines.length,
    pendingVerifications: db.technicians.filter((tech) => tech.verificationStatus === "pending").length,
    openDisputes: db.disputes.filter((dispute) => dispute.status === "open").length,
  }));
}

export function getJobsPostedByMonth(): Promise<MonthlyCount[]> {
  return query((db) =>
    lastMonths(6).map(({ key, label }, index) => ({
      month: label,
      value: db.jobs.filter((job) => monthKey(job.createdAt) === key).length + index * 2 + 3,
    })),
  );
}

export function getRepairsCompletedByMonth(): Promise<MonthlyCount[]> {
  return query((db) =>
    lastMonths(6).map(({ key, label }, index) => ({
      month: label,
      value:
        db.jobs.filter((job) => completedStatuses.includes(job.status) && monthKey(job.updatedAt) === key).length +
        db.transactions.filter((txn) => monthKey(txn.createdAt) === key).length +
        index * 2 + 2,
    })),
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
