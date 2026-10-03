import type { EarningTransaction, EarningsSummary, MonthlyCount } from "@/types";
import { nowIso } from "@/lib/utils";
import { mutate, query } from "./client";
import { lastMonths, monthKey } from "./months";

const awaitingStatuses = ["approved", "fixed", "confirmed"];

export function getEarningsSummary(technicianId: string): Promise<EarningsSummary> {
  return query((db) => {
    const payments = db.transactions.filter((txn) => txn.technicianId === technicianId);
    const awaitingPayment = db.jobs
      .filter((job) => job.technicianId === technicianId && awaitingStatuses.includes(job.status))
      .reduce((sum, job) => sum + (job.quote?.total ?? job.estimatedPay), 0);
    return { totalEarned: payments.reduce((sum, txn) => sum + txn.amount, 0), awaitingPayment, paidJobs: payments.length };
  });
}

export function listTransactions(technicianId: string): Promise<EarningTransaction[]> {
  return query((db) => db.transactions.filter((txn) => txn.technicianId === technicianId).sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
}

export function getEarningsByMonth(technicianId: string): Promise<MonthlyCount[]> {
  return query((db) => {
    const payments = db.transactions.filter((txn) => txn.technicianId === technicianId);
    return lastMonths(6).map(({ key, label }) => ({
      month: label,
      value: payments.filter((txn) => monthKey(txn.createdAt) === key).reduce((sum, txn) => sum + txn.amount, 0),
    }));
  });
}

export function requestMaintenanceReport(hospitalId: string): Promise<{ fileName: string }> {
  return mutate((db) => {
    const hospital = db.hospitals.find((candidate) => candidate.id === hospitalId);
    const slug = (hospital?.name ?? "hospital").toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return { fileName: `${slug}-maintenance-report-${nowIso().slice(0, 10)}.pdf` };
  });
}
