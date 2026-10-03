"use client";

import { useQuery } from "@tanstack/react-query";
import { jobsApi, reportsApi } from "@/lib/api";
import { queryKeys } from "./query-keys";
import { useCurrentUser, useHospitalId, useTechnicianId } from "./use-session";

export function useHospitalJobs() {
  const hospitalId = useHospitalId();
  return useQuery({ queryKey: queryKeys.hospitalJobs(hospitalId), queryFn: () => jobsApi.listHospitalJobs(hospitalId) });
}

export function useAllJobs() {
  return useQuery({ queryKey: queryKeys.allJobs, queryFn: jobsApi.listAllJobs });
}

export function useJob(id: string | null) {
  const technicianId = useTechnicianId();
  return useQuery({
    queryKey: queryKeys.job(id ?? ""),
    queryFn: () => jobsApi.getJob(id ?? "", technicianId || undefined),
    enabled: Boolean(id),
  });
}

export function useOpenJobs() {
  const technicianId = useTechnicianId();
  return useQuery({ queryKey: queryKeys.openJobs(technicianId), queryFn: () => jobsApi.listOpenJobs(technicianId) });
}

export function useTechnicianJobs() {
  const technicianId = useTechnicianId();
  return useQuery({ queryKey: queryKeys.technicianJobs(technicianId), queryFn: () => jobsApi.listTechnicianJobs(technicianId) });
}

export function useActiveJobForMachine(machineId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.machineJob(machineId ?? ""),
    queryFn: () => jobsApi.getActiveJobForMachine(machineId ?? ""),
    enabled: Boolean(machineId),
  });
}

export function useMyReports() {
  const user = useCurrentUser();
  return useQuery({ queryKey: queryKeys.myReports(user.id), queryFn: () => reportsApi.listReportsByUser(user.id) });
}
