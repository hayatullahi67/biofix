import type { Machine, MachineDocument, MachineEvent, MachineFilters, NewMachineInput } from "@/types";
import { createId } from "@/lib/utils";
import { findOrThrow, mutate, notFound, query } from "./client";

function matchesFilters(machine: Machine, filters: MachineFilters): boolean {
  const search = filters.search?.trim().toLowerCase();
  if (search) {
    const haystack = `${machine.name} ${machine.code} ${machine.brand} ${machine.model} ${machine.serialNumber}`.toLowerCase();
    if (!haystack.includes(search)) return false;
  }
  if (filters.status && filters.status !== "all" && machine.status !== filters.status) return false;
  if (filters.type && filters.type !== "all" && machine.type !== filters.type) return false;
  if (filters.ward && filters.ward !== "all" && machine.ward !== filters.ward) return false;
  return true;
}

export function listMachines(hospitalId: string, filters: MachineFilters = {}): Promise<Machine[]> {
  return query((db) =>
    db.machines.filter((machine) => machine.hospitalId === hospitalId && matchesFilters(machine, filters)).sort((a, b) => a.code.localeCompare(b.code)),
  );
}

export function getMachine(id: string): Promise<Machine> {
  return query((db) => findOrThrow(db.machines, id, "Machine"));
}

export function getMachineByCode(code: string): Promise<Machine> {
  return query((db) => db.machines.find((machine) => machine.code.toLowerCase() === code.toLowerCase()) ?? notFound("Machine"));
}

export function listMachineEvents(machineId: string): Promise<MachineEvent[]> {
  return query((db) => db.machineEvents.filter((event) => event.machineId === machineId).sort((a, b) => b.date.localeCompare(a.date)));
}

export function listMachineDocuments(machineId: string): Promise<MachineDocument[]> {
  return query((db) => db.machineDocuments.filter((document) => document.machineId === machineId));
}

function addMonths(iso: string, months: number): string {
  const date = new Date(iso);
  date.setMonth(date.getMonth() + months);
  return date.toISOString();
}

export function createMachine(hospitalId: string, input: NewMachineInput): Promise<Machine> {
  return mutate((db) => {
    const sequence = db.machines.filter((machine) => machine.hospitalId === hospitalId).length + 1;
    const prefix = db.machines.find((machine) => machine.hospitalId === hospitalId)?.code.split("-")[0] ?? "BFX";
    const machine: Machine = {
      ...input,
      id: createId("mach"),
      code: `${prefix}-${String(900 + sequence).padStart(4, "0")}`,
      photoUrl: input.photoUrl ?? "/machines/monitor.svg",
      status: "working",
      lastServiceDate: input.purchaseDate,
      nextServiceDate: addMonths(input.purchaseDate, input.serviceIntervalMonths),
      hospitalId,
    };
    db.machines.push(machine);
    db.machineEvents.push({
      id: createId("ev"),
      machineId: machine.id,
      type: "installed",
      title: "Added to Biofix",
      description: `${machine.brand} ${machine.model} registered in ${machine.ward}.`,
      date: input.purchaseDate,
    });
    return machine;
  });
}

export function listWards(hospitalId: string): Promise<string[]> {
  return query((db) => [...new Set(db.machines.filter((machine) => machine.hospitalId === hospitalId).map((machine) => machine.ward))].sort());
}
