import type { Machine, MachineDocument, MachineEvent } from "@/types";
import { daysAgo } from "./dates";
import { seedMachines } from "./machines";

function eventsFor(machine: Machine, index: number): MachineEvent[] {
  const faultDays = 8 + ((index * 23) % 170);
  const base: MachineEvent[] = [
    { id: `${machine.id}-ev-1`, machineId: machine.id, type: "installed", title: "Installed and commissioned", description: `${machine.brand} ${machine.model} installed in ${machine.ward}.`, date: machine.purchaseDate, actor: "Vendor engineer" },
    { id: `${machine.id}-ev-2`, machineId: machine.id, type: "service", title: "Preventive maintenance", description: "Calibration, electrical safety test and filter replacement.", date: daysAgo(380 - index * 3), actor: "Kelechi Nnamdi" },
    { id: `${machine.id}-ev-3`, machineId: machine.id, type: "fault", title: "Fault reported", description: "Intermittent error code during use. Reported by ward nurse.", date: daysAgo(faultDays), actor: "Blessing Eze" },
    { id: `${machine.id}-ev-4`, machineId: machine.id, type: "repair", title: "Repair completed", description: "Replaced worn connector and recalibrated. Passed functional test.", date: daysAgo(faultDays - 2), actor: "Emeka Obi" },
  ];
  const lastService: MachineEvent = {
    id: `${machine.id}-ev-5`,
    machineId: machine.id,
    type: "service",
    title: "Scheduled service",
    description: `Routine ${machine.serviceIntervalMonths}-month service completed.`,
    date: machine.lastServiceDate,
    actor: "Emeka Obi",
  };
  return [...base, lastService];
}

export const seedMachineEvents: MachineEvent[] = seedMachines.flatMap(eventsFor);

export const seedMachineDocuments: MachineDocument[] = seedMachines.flatMap((machine) => [
  { id: `${machine.id}-doc-1`, machineId: machine.id, name: `${machine.brand} ${machine.model} user manual.pdf`, kind: "manual", sizeKb: 4820, uploadedAt: machine.purchaseDate },
  { id: `${machine.id}-doc-2`, machineId: machine.id, name: "Warranty certificate.pdf", kind: "warranty", sizeKb: 312, uploadedAt: machine.purchaseDate },
  { id: `${machine.id}-doc-3`, machineId: machine.id, name: "Last service report.pdf", kind: "service_report", sizeKb: 640, uploadedAt: machine.lastServiceDate },
]);
