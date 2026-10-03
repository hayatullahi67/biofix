import type { BadgeTone } from "@/components/ui/badge";
import type { JobStatus, MachineStatus, Urgency, VerificationStatus } from "@/types";
import { jobStatusLabels } from "./job-flow";

interface StatusMeta {
  label: string;
  tone: BadgeTone;
}

export const machineStatusMeta: Record<MachineStatus, StatusMeta> = {
  working: { label: "Working", tone: "success" },
  due_service: { label: "Due for service", tone: "warning" },
  broken: { label: "Broken", tone: "danger" },
  in_repair: { label: "In repair", tone: "info" },
};

const jobTones: Record<JobStatus, BadgeTone> = {
  reported: "danger",
  open: "warning",
  accepted: "info",
  arrived: "info",
  quoted: "warning",
  approved: "info",
  fixed: "primary",
  confirmed: "success",
  paid: "success",
  disputed: "danger",
};

export const jobStatusMeta = Object.fromEntries(
  (Object.keys(jobTones) as JobStatus[]).map((status) => [status, { label: jobStatusLabels[status], tone: jobTones[status] }]),
) as Record<JobStatus, StatusMeta>;

export const urgencyMeta: Record<Urgency, StatusMeta> = {
  low: { label: "Low", tone: "neutral" },
  medium: { label: "Medium", tone: "warning" },
  critical: { label: "Critical", tone: "danger" },
};

export const verificationMeta: Record<VerificationStatus, StatusMeta> = {
  pending: { label: "Pending review", tone: "warning" },
  verified: { label: "Verified", tone: "success" },
  rejected: { label: "Rejected", tone: "danger" },
};
