import type { Machine, MachineStatus, MachineType } from "@/types";
import { daysAgo, daysAhead } from "./dates";

type MachineRow = [
  name: string,
  type: MachineType,
  brand: string,
  model: string,
  ward: string,
  status: MachineStatus,
  interval: number,
  lastServiceDaysAgo: number,
  nextServiceInDays: number,
  hospitalId: string,
];

const photoByType: Record<MachineType, string> = {
  "X-ray machine": "xray",
  "Ultrasound scanner": "ultrasound",
  "Patient monitor": "monitor",
  Ventilator: "ventilator",
  "Dialysis machine": "cabinet",
  "Infusion pump": "pump",
  Defibrillator: "monitor",
  "Anaesthesia machine": "ventilator",
  Autoclave: "cabinet",
  "Haematology analyser": "cabinet",
  "Oxygen concentrator": "cabinet",
  "ECG machine": "monitor",
  "Infant incubator": "incubator",
};

const rows: MachineRow[] = [
  ["ICU Ventilator 1", "Ventilator", "Dräger", "Savina 300", "ICU", "broken", 6, 120, 60, "hosp-1"],
  ["ICU Ventilator 2", "Ventilator", "Hamilton", "C3", "ICU", "working", 6, 40, 140, "hosp-1"],
  ["Bedside Monitor A", "Patient monitor", "Philips", "IntelliVue MX450", "ICU", "in_repair", 12, 200, 165, "hosp-1"],
  ["Bedside Monitor B", "Patient monitor", "Mindray", "BeneVision N12", "ICU", "working", 12, 90, 275, "hosp-1"],
  ["Digital X-ray Unit", "X-ray machine", "Siemens", "Multix Impact", "Radiology", "due_service", 6, 178, 3, "hosp-1"],
  ["Portable Ultrasound", "Ultrasound scanner", "GE", "Vscan Air", "Maternity", "working", 12, 60, 300, "hosp-1"],
  ["Obstetric Ultrasound", "Ultrasound scanner", "Mindray", "DC-70", "Maternity", "broken", 12, 300, 65, "hosp-1"],
  ["Haemodialysis Unit 1", "Dialysis machine", "Fresenius", "4008S", "Renal", "working", 3, 30, 60, "hosp-1"],
  ["Haemodialysis Unit 2", "Dialysis machine", "Nipro", "Surdial X", "Renal", "due_service", 3, 87, 5, "hosp-1"],
  ["Syringe Pump 04", "Infusion pump", "B. Braun", "Perfusor Space", "Paediatrics", "working", 12, 100, 265, "hosp-1"],
  ["Volumetric Pump 07", "Infusion pump", "Baxter", "Sigma Spectrum", "Emergency", "in_repair", 12, 250, 115, "hosp-1"],
  ["Crash Cart Defibrillator", "Defibrillator", "Zoll", "R Series", "Emergency", "working", 6, 20, 160, "hosp-1"],
  ["Theatre Anaesthesia Machine", "Anaesthesia machine", "GE", "Carestation 650", "Theatre", "due_service", 6, 176, 2, "hosp-1"],
  ["CSSD Autoclave", "Autoclave", "Tuttnauer", "3870ELV", "CSSD", "broken", 6, 150, 30, "hosp-1"],
  ["Haematology Analyser", "Haematology analyser", "Sysmex", "XN-550", "Laboratory", "working", 6, 70, 110, "hosp-1"],
  ["Oxygen Concentrator 2", "Oxygen concentrator", "Philips", "EverFlo", "Male Ward", "working", 6, 50, 130, "hosp-1"],
  ["12-lead ECG", "ECG machine", "Schiller", "Cardiovit AT-102", "Emergency", "due_service", 12, 360, 6, "hosp-1"],
  ["Neonatal Incubator 1", "Infant incubator", "Dräger", "Isolette 8000", "NICU", "working", 6, 30, 150, "hosp-1"],
  ["Neonatal Incubator 2", "Infant incubator", "Atom", "V-2100G", "NICU", "in_repair", 6, 190, -10, "hosp-1"],
  ["Recovery Monitor", "Patient monitor", "Mindray", "uMEC 10", "Theatre", "working", 12, 15, 350, "hosp-1"],
  ["Lekki Ward Ventilator", "Ventilator", "Mindray", "SV300", "ICU", "broken", 6, 160, 20, "hosp-2"],
  ["C-Arm X-ray", "X-ray machine", "Philips", "Zenition 50", "Theatre", "in_repair", 6, 170, 10, "hosp-2"],
  ["Paediatric Monitor", "Patient monitor", "Edan", "iM50", "Children's Ward", "broken", 12, 220, 145, "hosp-3"],
  ["Abuja Dialysis Unit", "Dialysis machine", "Fresenius", "5008S", "Renal", "broken", 3, 80, 10, "hosp-4"],
  ["Surgical Theatre Autoclave", "Autoclave", "Systec", "VX-150", "Theatre", "broken", 6, 190, -5, "hosp-5"],
];

const codePrefix: Record<string, string> = { "hosp-1": "GSH", "hosp-2": "HMC", "hosp-3": "RCC", "hosp-4": "USH", "hosp-5": "MDS" };

export const seedMachines: Machine[] = rows.map(
  ([name, type, brand, model, ward, status, interval, lastAgo, nextIn, hospitalId], index) => ({
    id: `mach-${index + 1}`,
    code: `${codePrefix[hospitalId]}-${String(index + 1).padStart(4, "0")}`,
    name,
    type,
    brand,
    model,
    serialNumber: `${brand.replace(/[^A-Z]/gi, "").slice(0, 3).toUpperCase()}${(483920 + index * 7919).toString()}`,
    ward,
    photoUrl: `/machines/${photoByType[type]}.svg`,
    status,
    purchaseDate: daysAgo(900 + index * 31),
    warrantyEnd: daysAhead(index % 3 === 0 ? -60 : 200 + index * 10),
    serviceIntervalMonths: interval,
    lastServiceDate: daysAgo(lastAgo),
    nextServiceDate: daysAhead(nextIn),
    hospitalId,
  }),
);
