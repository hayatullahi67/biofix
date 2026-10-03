"use client";

import Link from "next/link";
import { Inbox } from "lucide-react";
import { ListSkeleton } from "@/components/shared/list-skeleton";
import { QueryState } from "@/components/shared/query-state";
import { SectionCard } from "@/components/shared/section-card";
import { JobStatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/ui/empty-state";
import { useHospitalJobs } from "@/hooks/use-jobs";
import { jobTabStatuses } from "@/lib/domain/job-flow";
import { formatRelative, toIsoString } from "@/lib/utils";

const openStatuses = [...jobTabStatuses.reported, ...jobTabStatuses.in_progress, ...jobTabStatuses.awaiting];

export function OpenJobsList() {
  const query = useHospitalJobs();
  return (
    <SectionCard id="open-jobs" title="Open jobs" description="Faults being handled right now" action={{ href: "/hospital/jobs", label: "All jobs" }}>
      <QueryState
        query={query}
        loading={<ListSkeleton rows={4} />}
        isEmpty={(jobs) => !jobs.some((job) => openStatuses.includes(job.status))}
        empty={<EmptyState icon={Inbox} title="No open jobs" description="Every reported fault has been fixed. Nice work." />}
      >
        {(jobs) => (
          <ul className="-mx-2 divide-y divide-border">
            {jobs.filter((job) => openStatuses.includes(job.status)).slice(0, 6).map((job) => (
              <li key={job.id}>
                <Link href={`/hospital/jobs?job=${job.id}`} className="flex items-center justify-between gap-3 rounded-xl px-2 py-3 transition-colors hover:bg-muted/60">
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium">{job.machine.name}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {job.machine.ward} · {job.report.category} · <time dateTime={toIsoString(job.updatedAt)}>{formatRelative(job.updatedAt)}</time>
                    </span>
                  </span>
                  <JobStatusBadge status={job.status} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </QueryState>
    </SectionCard>
  );
}
