import { Badge } from "@/components/ui/badge";
import { jobStatusMeta, machineStatusMeta, urgencyMeta, verificationMeta } from "@/lib/domain/status-meta";
import type { JobStatus, MachineStatus, Urgency, VerificationStatus } from "@/types";

export function MachineStatusBadge({ status }: { status: MachineStatus }) {
  const meta = machineStatusMeta[status];
  return (
    <Badge tone={meta.tone} dot pulse={status === "broken"}>
      {meta.label}
    </Badge>
  );
}

export function JobStatusBadge({ status }: { status: JobStatus }) {
  const meta = jobStatusMeta[status];
  return (
    <Badge tone={meta.tone} dot>
      {meta.label}
    </Badge>
  );
}

export function UrgencyBadge({ urgency }: { urgency: Urgency }) {
  const meta = urgencyMeta[urgency];
  return (
    <Badge tone={meta.tone} dot pulse={urgency === "critical"}>
      {meta.label}
      <span className="sr-only"> urgency</span>
    </Badge>
  );
}

export function VerificationBadge({ status }: { status: VerificationStatus }) {
  const meta = verificationMeta[status];
  return (
    <Badge tone={meta.tone} dot>
      {meta.label}
    </Badge>
  );
}
