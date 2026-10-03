"use client";

import { useQuery } from "@tanstack/react-query";
import { paymentsApi } from "@/lib/api";
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

export function useMaintenanceReport() {
  const hospitalId = useHospitalId();
  return useApiMutation({
    mutationFn: () => paymentsApi.requestMaintenanceReport(hospitalId),
    successMessage: (result) => `${result.fileName} is ready`,
  });
}
