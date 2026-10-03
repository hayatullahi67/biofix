"use client";

import { useQuery } from "@tanstack/react-query";
import { paymentsApi } from "@/lib/api";
import type { WithdrawInput } from "@/types";
import { queryKeys } from "./query-keys";
import { useApiMutation } from "./use-api-mutation";
import { useHospitalId, useTechnicianId } from "./use-session";

export function useEarningsSummary() {
  const technicianId = useTechnicianId();
  return useQuery({ queryKey: [...queryKeys.earnings(technicianId), "summary"], queryFn: () => paymentsApi.getEarningsSummary(technicianId) });
}

export function useTransactions() {
  const technicianId = useTechnicianId();
  return useQuery({ queryKey: [...queryKeys.earnings(technicianId), "transactions"], queryFn: () => paymentsApi.listTransactions(technicianId) });
}

export function useEarningsByMonth() {
  const technicianId = useTechnicianId();
  return useQuery({ queryKey: [...queryKeys.earnings(technicianId), "monthly"], queryFn: () => paymentsApi.getEarningsByMonth(technicianId) });
}

export function useWithdraw(onDone?: () => void) {
  const technicianId = useTechnicianId();
  return useApiMutation({
    mutationFn: (input: WithdrawInput) => paymentsApi.withdraw(technicianId, input),
    invalidate: [["earnings"]],
    successMessage: "Withdrawal requested. Funds arrive within 24 hours.",
    onSuccess: () => onDone?.(),
  });
}

export function useBilling() {
  const hospitalId = useHospitalId();
  return useQuery({ queryKey: queryKeys.billing(hospitalId), queryFn: () => paymentsApi.listBilling(hospitalId) });
}

export function useMaintenanceReport() {
  const hospitalId = useHospitalId();
  return useApiMutation({
    mutationFn: () => paymentsApi.requestMaintenanceReport(hospitalId),
    successMessage: (result) => `${result.fileName} is ready`,
  });
}
