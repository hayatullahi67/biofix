import type { Column } from "@/components/shared/data-table";
import { JobStatusBadge } from "@/components/shared/status-badge";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatNaira, toIsoString } from "@/lib/utils";
import type { Dispute, JobDetails } from "@/types";

const date = (value: string) => <time dateTime={toIsoString(value)} className="whitespace-nowrap text-muted-foreground">{formatDate(value)}</time>;

export const jobColumns: Column<JobDetails>[] = [
  { key: "machine", header: "Job", cell: (job) => <span><span className="block font-medium">{job.machine.name}</span><span className="block font-mono text-xs text-muted-foreground">{job.id.toUpperCase()}</span></span> },
  { key: "hospital", header: "Hospital", cell: (job) => job.hospital.name },
  { key: "technician", header: "Technician", cell: (job) => job.technician?.name ?? <span className="text-muted-foreground">Unassigned</span> },
  { key: "amount", header: "Amount", className: "tabular-nums", cell: (job) => formatNaira(job.quote?.total ?? job.estimatedPay) },
  { key: "status", header: "Status", cell: (job) => <JobStatusBadge status={job.status} /> },
  { key: "updated", header: "Updated", cell: (job) => date(job.updatedAt) },
];

export function disputeColumns(onResolve: (id: string) => void, resolvingId?: string): Column<Dispute>[] {
  return [
    { key: "job", header: "Job", cell: (dispute) => <span className="font-mono text-xs">{dispute.jobId.toUpperCase()}</span> },
    { key: "parties", header: "Hospital / technician", cell: (dispute) => <span><span className="block font-medium">{dispute.hospitalName}</span><span className="block text-xs text-muted-foreground">{dispute.technicianName}</span></span> },
    { key: "reason", header: "Reason", cell: (dispute) => <span className="line-clamp-2 max-w-xs text-muted-foreground">{dispute.reason}</span> },
    { key: "amount", header: "Job value", className: "tabular-nums", cell: (dispute) => formatNaira(dispute.amount) },
    { key: "status", header: "Status", cell: (dispute) => <Badge tone={dispute.status === "open" ? "danger" : "success"} dot>{dispute.status === "open" ? "Open" : "Resolved"}</Badge> },
    {
      key: "action",
      header: "Action",
      headerClassName: "sr-only",
      className: "text-right",
      cell: (dispute) =>
        dispute.status === "open" ? (
          <button type="button" onClick={() => onResolve(dispute.id)} disabled={resolvingId === dispute.id} className="text-sm font-medium text-primary hover:underline disabled:opacity-50">
            Mark resolved
          </button>
        ) : null,
    },
  ];
}
