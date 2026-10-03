"use client";

import { jobActionsApi, reportsApi } from "@/lib/api";
import type { FixReportInput, JobContact, NewFaultReportInput, PaymentMethod, QuoteInput } from "@/types";
import { useApiMutation } from "./use-api-mutation";

export const jobKeys = [["jobs"], ["machine"], ["machines"], ["stats"], ["earnings"], ["notifications"], ["technicians"]];

export function useMarkArrived() {
  return useApiMutation({ mutationFn: jobActionsApi.markArrived, invalidate: jobKeys, successMessage: "Arrival confirmed" });
}

export function useSendQuote(jobId: string) {
  return useApiMutation({ mutationFn: (input: QuoteInput) => jobActionsApi.sendQuote(jobId, input), invalidate: jobKeys, successMessage: "Quote sent to the hospital" });
}

export function useApproveQuote() {
  return useApiMutation({ mutationFn: jobActionsApi.approveQuote, invalidate: jobKeys, successMessage: "Quote approved. The technician can start the repair." });
}

export function useMarkFixed(jobId: string) {
  return useApiMutation({ mutationFn: (input: FixReportInput) => jobActionsApi.markFixed(jobId, input), invalidate: jobKeys, successMessage: "Marked as fixed. Waiting for the hospital to confirm." });
}

export function useConfirmJob() {
  return useApiMutation({ mutationFn: jobActionsApi.confirmJob, invalidate: jobKeys, successMessage: "Repair confirmed. Pay the technician directly, then mark it as paid." });
}

export function useMarkPaid() {
  return useApiMutation({
    mutationFn: ({ jobId, method }: { jobId: string; method: PaymentMethod }) => jobActionsApi.markPaid(jobId, method),
    invalidate: jobKeys,
    successMessage: "Payment recorded",
  });
}

export function useRateJob() {
  return useApiMutation({
    mutationFn: ({ jobId, rating, comment }: { jobId: string; rating: number; comment: string }) => jobActionsApi.rateJob(jobId, rating, comment),
    invalidate: jobKeys,
    successMessage: "Thanks for rating your technician",
  });
}

export function useCreateReport() {
  return useApiMutation({
    mutationFn: ({ input, contact }: { input: NewFaultReportInput; contact?: JobContact }) => reportsApi.createFaultReport(input, contact),
    invalidate: [...jobKeys, ["messages"]],
  });
}
