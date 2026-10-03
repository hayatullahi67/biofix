import type { HospitalStats, Machine, MonthlyCount } from "@/types";
import { query } from "./client";
import { lastMonths, monthKey } from "./months";

export function getHospitalStats(hospitalId: string): Promise<HospitalStats> {
  return query((db) => {
    const machines = db.machines.filter((machine) => machine.hospitalId === hospitalId);
    return {
      totalMachines: machines.length,
      working: machines.filter((machine) => machine.status === "working").length,
      dueService: machines.filter((machine) => machine.status === "due_service").length,
      broken: machines.filter((machine) => machine.status === "broken" || machine.status === "in_repair").length,
    };
  });
}

export function getFaultsPerMonth(hospitalId: string): Promise<MonthlyCount[]> {
  return query((db) => {
    const machineIds = new Set(db.machines.filter((machine) => machine.hospitalId === hospitalId).map((machine) => machine.id));
    const faultDates = [
      ...db.machineEvents.filter((event) => event.type === "fault" && machineIds.has(event.machineId)).map((event) => event.date),
      ...db.reports.filter((report) => machineIds.has(report.machineId)).map((report) => report.createdAt),
    ];
    return lastMonths(6).map(({ key, label }) => ({ month: label, value: faultDates.filter((date) => monthKey(date) === key).length }));
  });
}

export function listDueForService(hospitalId: string, withinDays = 7): Promise<Machine[]> {
  return query((db) => {
    const limit = Date.now() + withinDays * 86_400_000;
    return db.machines
      .filter((machine) => machine.hospitalId === hospitalId && machine.status !== "broken" && new Date(machine.nextServiceDate).getTime() <= limit)
      .sort((a, b) => a.nextServiceDate.localeCompare(b.nextServiceDate));
  });
}
