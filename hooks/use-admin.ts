"use client";

import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/lib/api";
import { queryKeys } from "./query-keys";
import { useApiMutation } from "./use-api-mutation";

export function usePlatformStats() {
  return useQuery({ queryKey: [...queryKeys.admin, "stats"], queryFn: adminApi.getPlatformStats });
}

export function useDisputes() {
  return useQuery({ queryKey: [...queryKeys.admin, "disputes"], queryFn: adminApi.listDisputes });
}

export function useResolveDispute() {
  return useApiMutation({ mutationFn: adminApi.resolveDispute, invalidate: [queryKeys.admin], successMessage: "Dispute marked as resolved" });
}

export function useJobsPostedSeries() {
  return useQuery({ queryKey: [...queryKeys.admin, "jobs-posted"], queryFn: adminApi.getJobsPostedByMonth });
}

export function useRepairsCompletedSeries() {
  return useQuery({ queryKey: [...queryKeys.admin, "repairs-completed"], queryFn: adminApi.getRepairsCompletedByMonth });
}
