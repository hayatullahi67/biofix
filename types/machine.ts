export type MachineStatus = "working" | "due_service" | "broken" | "in_repair";

export const machineTypes = [
  "X-ray machine",
  "Ultrasound scanner",
  "Patient monitor",
  "Ventilator",
  "Dialysis machine",
  "Infusion pump",
  "Defibrillator",
  "Anaesthesia machine",
  "Autoclave",
  "Haematology analyser",
  "Oxygen concentrator",
  "ECG machine",
  "Infant incubator",
] as const;

export type MachineType = (typeof machineTypes)[number];

export interface Machine {
  id: string;
  code: string;
  name: string;
  type: MachineType;
  brand: string;
  model: string;
  serialNumber: string;
  ward: string;
  photoUrl: string;
  status: MachineStatus;
  purchaseDate: string;
  warrantyEnd: string;
  serviceIntervalMonths: number;
  lastServiceDate: string;
  nextServiceDate: string;
  hospitalId: string;
}

export type MachineEventType = "installed" | "service" | "fault" | "repair";

export interface MachineEvent {
  id: string;
  machineId: string;
  type: MachineEventType;
  title: string;
  description: string;
  date: string;
  actor?: string;
}

export interface MachineDocument {
  id: string;
  machineId: string;
  name: string;
  kind: "manual" | "warranty" | "service_report" | "invoice";
  sizeKb: number;
  uploadedAt: string;
}

export interface MachineFilters {
  search?: string;
  status?: MachineStatus | "all";
  ward?: string;
  type?: MachineType | "all";
}

export type NewMachineInput = Omit<
  Machine,
  "id" | "code" | "status" | "lastServiceDate" | "nextServiceDate" | "hospitalId" | "photoUrl"
> & { photoUrl?: string };
