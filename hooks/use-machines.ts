"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { machinesApi } from "@/lib/api";
import type { MachineFilters, NewMachineInput } from "@/types";
import { queryKeys } from "./query-keys";
import { useApiMutation } from "./use-api-mutation";
import { useHospitalId } from "./use-session";

export function useMachines(filters: MachineFilters = {}) {
  const hospitalId = useHospitalId();
  return useQuery({ queryKey: queryKeys.machines(hospitalId, filters), queryFn: () => machinesApi.listMachines(hospitalId, filters), enabled: Boolean(hospitalId), placeholderData: keepPreviousData });
}

export function useMachine(id: string) {
  return useQuery({ queryKey: queryKeys.machine(id), queryFn: () => machinesApi.getMachine(id) });
}

export function useMachineByCode(code: string) {
  return useQuery({ queryKey: queryKeys.machineByCode(code), queryFn: () => machinesApi.getMachineByCode(code) });
}

export function useMachineEvents(machineId: string) {
  return useQuery({ queryKey: queryKeys.machineEvents(machineId), queryFn: () => machinesApi.listMachineEvents(machineId), enabled: Boolean(machineId) });
}

export function useMachineDocuments(machineId: string) {
  return useQuery({ queryKey: queryKeys.machineDocuments(machineId), queryFn: () => machinesApi.listMachineDocuments(machineId) });
}

export function useWards() {
  const hospitalId = useHospitalId();
  return useQuery({ queryKey: queryKeys.wards(hospitalId), queryFn: () => machinesApi.listWards(hospitalId), enabled: Boolean(hospitalId) });
}

export function useCreateMachine(onCreated?: () => void) {
  const hospitalId = useHospitalId();
  return useApiMutation({
    mutationFn: (input: NewMachineInput) => machinesApi.createMachine(hospitalId, input),
    invalidate: [["machines"], ["stats"], ["wards"]],
    successMessage: (machine) => `${machine.name} added with code ${machine.code}`,
    onSuccess: () => onCreated?.(),
  });
}
