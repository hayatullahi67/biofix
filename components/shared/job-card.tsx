import Link from "next/link";
import { Building2, Clock, Navigation } from "lucide-react";
import { Card } from "@/components/ui/card";
import { formatDistanceKm, formatNaira, formatRelative, toIsoString } from "@/lib/utils";
import type { JobDetails } from "@/types";
import { JobStatusBadge, UrgencyBadge } from "./status-badge";

interface JobCardProps {
  job: JobDetails;
  href: string;
  showStatus?: boolean;
}

export function JobCard({ job, href, showStatus = false }: JobCardProps) {
  const pay = job.quote?.total ?? job.estimatedPay;
  return (
    <Card as="article" interactive className="relative flex flex-col gap-4 p-5">
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-primary">{job.machine.type}</p>
          <h3 className="truncate text-base font-semibold tracking-tight">
            <Link href={href} className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none">
              {job.report.category}: {job.machine.name}
            </Link>
          </h3>
        </div>
        {showStatus ? <JobStatusBadge status={job.status} /> : <UrgencyBadge urgency={job.report.urgency} />}
      </header>
      <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{job.report.description}</p>
      <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
        <li className="flex items-center gap-1.5">
          <Building2 className="size-3.5" aria-hidden="true" />
          {job.hospital.name}, {job.hospital.area}
        </li>
        {job.distanceKm !== undefined ? (
          <li className="flex items-center gap-1.5">
            <Navigation className="size-3.5" aria-hidden="true" />
            {formatDistanceKm(job.distanceKm)}
          </li>
        ) : null}
        <li className="flex items-center gap-1.5">
          <Clock className="size-3.5" aria-hidden="true" />
          Posted <time dateTime={toIsoString(job.createdAt)}>{formatRelative(job.createdAt)}</time>
        </li>
      </ul>
      <footer className="flex items-center justify-between border-t border-border pt-4">
        <span className="text-xs text-muted-foreground">{job.quote ? "Quoted" : "Estimated pay"}</span>
        <span className="text-base font-semibold tabular-nums text-foreground">{formatNaira(pay)}</span>
      </footer>
    </Card>
  );
}
