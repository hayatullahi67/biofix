import type { FaultCategory, FaultReport, Job, JobStatus, Quote, Urgency } from "@/types";
import { jobFlow, jobTimelineLabels } from "@/lib/domain/job-flow";
import { hoursAgo } from "./dates";
import { seedMachines } from "./machines";

type JobRow = [
  machineIndex: number,
  status: JobStatus,
  urgency: Urgency,
  category: FaultCategory,
  description: string,
  reporterId: string,
  technicianId: string | undefined,
  hoursSinceReport: number,
  pay: number,
];

const rows: JobRow[] = [
  [1, "open", "critical", "Error on screen", "Ventilator alarms 'Low pressure' every few minutes and stops cycling. Patient moved to Ventilator 2.", "user-nurse-1", undefined, 3, 135_000],
  [7, "reported", "medium", "Won't turn on", "Scanner does not power on after the power outage last night. Display stays black.", "user-nurse-2", undefined, 1, 60_000],
  [3, "quoted", "critical", "Not accurate", "SpO2 readings jump between 70% and 99% on stable patients. Tried a new probe.", "user-nurse-1", "tech-1", 30, 95_000],
  [11, "accepted", "medium", "Error on screen", "Pump shows 'Occlusion downstream' even with a clear line.", "user-nurse-4", "tech-1", 20, 60_000],
  [19, "fixed", "critical", "Not accurate", "Incubator temperature drifts 2°C above set point.", "user-nurse-5", "tech-4", 72, 95_000],
  [14, "open", "medium", "Strange noise", "Loud knocking sound during the drying cycle. Cycle aborts at 80%.", "user-nurse-3", undefined, 8, 60_000],
  [21, "open", "critical", "Won't turn on", "Ventilator fails self-test at start-up with error E-104.", "user-admin-2", undefined, 5, 135_000],
  [22, "approved", "medium", "Physical damage", "C-arm cable housing cracked after it was knocked by a trolley.", "user-admin-2", "tech-5", 50, 100_000],
  [23, "open", "low", "Error on screen", "Monitor clock and alarm volume settings reset every morning.", "user-admin-2", undefined, 26, 35_000],
  [24, "open", "critical", "Error on screen", "Conductivity alarm on every session. Two sessions were cancelled today.", "user-admin-3", undefined, 4, 135_000],
  [25, "open", "medium", "Won't turn on", "Door seal sensor error. Autoclave will not start a cycle.", "user-admin-2", undefined, 14, 60_000],
  [12, "paid", "critical", "Won't turn on", "Defibrillator would not charge during weekly test.", "user-nurse-4", "tech-1", 480, 95_000],
  [2, "paid", "medium", "Strange noise", "Fan noise and intermittent temperature warning.", "user-nurse-1", "tech-1", 960, 100_000],
  [8, "confirmed", "medium", "Error on screen", "Blood pump stops with 'Arterial pressure low' alarm.", "user-nurse-1", "tech-3", 60, 100_000],
  [16, "disputed", "low", "Not accurate", "Oxygen purity indicator stays amber after the last repair.", "user-nurse-2", "tech-5", 240, 35_000],
];

const sampleQuote = (sentHoursAgo: number): Quote => ({
  parts: [
    { name: "SpO2 sensor module", price: 45_000 },
    { name: "Power board capacitor kit", price: 18_000 },
  ],
  labour: 25_000,
  total: 88_000,
  note: "Parts are available in Ikeja and can be fitted the same day.",
  sentAt: hoursAgo(sentHoursAgo),
});

export const seedReports: FaultReport[] = rows.map(([machineIndex, , urgency, category, description, reporterId, , hours], index) => ({
  id: `rep-${index + 1}`,
  machineId: `mach-${machineIndex}`,
  reportedBy: reporterId,
  photos: [seedMachines[machineIndex - 1]?.photoUrl ?? "/machines/monitor.svg"],
  category,
  description,
  urgency,
  createdAt: hoursAgo(hours),
}));

export const seedJobs: Job[] = rows.map(([machineIndex, status, , , , , technicianId, hours, pay], index) => {
  const reached = status === "disputed" ? jobFlow.slice(0, jobFlow.indexOf("fixed") + 1) : jobFlow.slice(0, jobFlow.indexOf(status) + 1);
  const steps: JobStatus[] = status === "disputed" ? [...reached, "disputed"] : reached;
  const stepGap = Math.max(1, Math.floor(hours / (steps.length + 1)));
  const quoteReached = steps.includes("quoted");
  return {
    id: `job-${index + 1}`,
    faultReportId: `rep-${index + 1}`,
    machineId: `mach-${machineIndex}`,
    hospitalId: seedMachines[machineIndex - 1]?.hospitalId ?? "hosp-1",
    technicianId,
    status,
    quote: quoteReached ? sampleQuote(hours - stepGap * 4) : undefined,
    fixReport: steps.includes("fixed")
      ? { notes: "Replaced faulty sensor and recalibrated. Ran a 2-hour soak test.", partsUsed: "Sensor module, thermal paste", beforePhotos: [], afterPhotos: [], submittedAt: hoursAgo(stepGap) }
      : undefined,
    timeline: steps.map((step, stepIndex) => ({
      id: `job-${index + 1}-evt-${stepIndex}`,
      status: step,
      label: jobTimelineLabels[step],
      at: hoursAgo(hours - stepGap * stepIndex),
    })),
    estimatedPay: pay,
    rating: status === "paid" ? 5 : undefined,
    createdAt: hoursAgo(hours),
    updatedAt: hoursAgo(Math.max(0, hours - stepGap * (steps.length - 1))),
  };
});
