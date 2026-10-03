"use client";

import { useQuery } from "@tanstack/react-query";
import { hospitalsApi } from "@/lib/api";
import type { HospitalProfileInput } from "@/types";
import { queryKeys } from "./query-keys";
import { useApiMutation } from "./use-api-mutation";
import { useHospitalId } from "./use-session";

export function useHospitals() {
  return useQuery({ queryKey: queryKeys.hospitals, queryFn: hospitalsApi.listHospitals });
}

export function useMyHospital() {
  const hospitalId = useHospitalId();
  return useQuery({ queryKey: queryKeys.hospital(hospitalId), queryFn: () => hospitalsApi.getHospital(hospitalId), enabled: Boolean(hospitalId) });
}

export function useHospital(id: string | undefined) {
  return useQuery({ queryKey: queryKeys.hospital(id ?? ""), queryFn: () => hospitalsApi.getHospital(id ?? ""), enabled: Boolean(id) });
}

export function useUpdateHospital() {
  const hospitalId = useHospitalId();
  return useApiMutation({
    mutationFn: (input: HospitalProfileInput) => hospitalsApi.updateHospitalProfile(hospitalId, input),
    invalidate: [["hospitals"]],
    successMessage: "Hospital profile saved",
  });
}
