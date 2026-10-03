"use client";

import { JobFaultDetails } from "@/components/shared/job-fault-details";
import { JobTimeline } from "@/components/shared/job-timeline";
import { ListSkeleton } from "@/components/shared/list-skeleton";
import { QueryState } from "@/components/shared/query-state";
import { JobStatusBadge } from "@/components/shared/status-badge";
import { TechnicianCard } from "@/components/shared/technician-card";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useJob } from "@/hooks/use-jobs";
import type { JobDetails } from "@/types";
import { HospitalJobActions } from "./hospital-job-actions";

function DrawerSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="space-y-3">
      <h3 id={id} className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">{title}</h3>
      {children}
    </section>
  );
}

function DrawerBody({ job }: { job: JobDetails }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-3">
        <JobStatusBadge status={job.status} />
        <span className="font-mono text-xs text-muted-foreground">{job.id.toUpperCase()}</span>
      </div>
      <DrawerSection id="drawer-next" title="Next step">
        <HospitalJobActions job={job} />
      </DrawerSection>
      <DrawerSection id="drawer-fault" title="Fault details">
        <JobFaultDetails job={job} />
      </DrawerSection>
      {job.technician ? (
        <DrawerSection id="drawer-technician" title="Assigned technician">
          <TechnicianCard technician={job.technician} />
        </DrawerSection>
      ) : null}
      <DrawerSection id="drawer-timeline" title="Status timeline">
        <JobTimeline job={job} />
      </DrawerSection>
    </div>
  );
}

interface HospitalJobDrawerProps {
  jobId: string | null;
  onClose: () => void;
}

export function HospitalJobDrawer({ jobId, onClose }: HospitalJobDrawerProps) {
  const query = useJob(jobId);
  const title = query.data ? `${query.data.machine.name}` : "Job details";
  return (
    <Sheet open={Boolean(jobId)} onOpenChange={(open) => !open && onClose()}>
      <SheetContent title={title} description={query.data ? `${query.data.machine.ward} · ${query.data.report.category}` : undefined}>
        {jobId ? (
          <QueryState query={query} loadingLabel="Loading job" loading={<ListSkeleton rows={6} className="h-20" />}>
            {(job) => <DrawerBody job={job} />}
          </QueryState>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
