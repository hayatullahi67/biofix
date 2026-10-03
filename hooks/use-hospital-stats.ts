"use client";

import { useQuery } from "@tanstack/react-query";
import { statsApi } from "@/lib/api";
import { queryKeys } from "./query-keys";
import { useHospitalId } from "./use-session";

export function useHospitalStats() {
  const hospitalId = useHospitalId();
  return useQuery({ queryKey: queryKeys.hospitalStats(hospitalId), queryFn: () => statsApi.getHospitalStats(hospitalId) });
}

export function useFaultsPerMonth() {
  const hospitalId = useHospitalId();
  return useQuery({ queryKey: queryKeys.faultsPerMonth(hospitalId), queryFn: () => statsApi.getFaultsPerMonth(hospitalId) });
}

export function useDueForService() {
  const hospitalId = useHospitalId();
  return useQuery({ queryKey: queryKeys.dueForService(hospitalId), queryFn: () => statsApi.listDueForService(hospitalId) });
}
