import type { BillingRecord, EarningTransaction, EarningsSummary, MonthlyCount, WithdrawInput } from "@/types";
import { createId, nowIso } from "@/lib/utils";
import { ApiError, mutate, query } from "./client";
import { lastMonths, monthKey } from "./months";
import type { MockDatabase } from "@/lib/mock-data";

const pendingStatuses = ["approved", "fixed", "confirmed"];

function summarise(db: MockDatabase, technicianId: string): EarningsSummary {
  const transactions = db.transactions.filter((txn) => txn.technicianId === technicianId);
  const earned = transactions.filter((txn) => txn.type === "job_payment");
  const withdrawn = transactions.filter((txn) => txn.type === "withdrawal").reduce((sum, txn) => sum + txn.amount, 0);
  const pending = db.jobs
    .filter((job) => job.technicianId === technicianId && pendingStatuses.includes(job.status))
    .reduce((sum, job) => sum + (job.quote?.total ?? job.estimatedPay), 0);
  const totalEarned = earned.reduce((sum, txn) => sum + txn.amount, 0);
  return { totalEarned, pending, available: Math.max(0, totalEarned - withdrawn) };
}

export function getEarningsSummary(technicianId: string): Promise<EarningsSummary> {
  return query((db) => summarise(db, technicianId));
}

export function listTransactions(technicianId: string): Promise<EarningTransaction[]> {
  return query((db) => db.transactions.filter((txn) => txn.technicianId === technicianId).sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
}

export function getEarningsByMonth(technicianId: string): Promise<MonthlyCount[]> {
  return query((db) => {
    const payments = db.transactions.filter((txn) => txn.technicianId === technicianId && txn.type === "job_payment");
    return lastMonths(6).map(({ key, label }) => ({
      month: label,
      value: payments.filter((txn) => monthKey(txn.createdAt) === key).reduce((sum, txn) => sum + txn.amount, 0),
    }));
  });
}

export function withdraw(technicianId: string, input: WithdrawInput): Promise<EarningTransaction> {
  return mutate((db) => {
    const { available } = summarise(db, technicianId);
    if (input.amount > available) throw new ApiError("You can't withdraw more than your available balance.", 422);
    const transaction: EarningTransaction = {
      id: createId("txn"),
      technicianId,
      type: "withdrawal",
      amount: input.amount,
      status: "pending",
      description: `Withdrawal to ${input.bankName} ••••${input.accountNumber.slice(-4)}`,
      createdAt: nowIso(),
    };
    db.transactions.unshift(transaction);
    return transaction;
  });
}

export function listBilling(hospitalId: string): Promise<BillingRecord[]> {
  return query((db) => db.billing.filter((record) => record.hospitalId === hospitalId));
}

export function requestMaintenanceReport(hospitalId: string): Promise<{ fileName: string }> {
  return mutate((db) => {
    const hospital = db.hospitals.find((candidate) => candidate.id === hospitalId);
    const slug = (hospital?.name ?? "hospital").toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return { fileName: `${slug}-maintenance-report-${nowIso().slice(0, 10)}.pdf` };
  });
}
