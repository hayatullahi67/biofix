"use client";

import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { JobContactSummary } from "@/components/shared/job-contact-summary";
import { JobFaultDetails } from "@/components/shared/job-fault-details";
import { JobTimeline } from "@/components/shared/job-timeline";
import { ListSkeleton } from "@/components/shared/list-skeleton";
import { QueryState } from "@/components/shared/query-state";
import { JobStatusBadge } from "@/components/shared/status-badge";
import { TechnicianCard } from "@/components/shared/technician-card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { messageThreadId } from "@/hooks/use-messages";
import { useCurrentUser } from "@/hooks/use-session";
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
  const user = useCurrentUser();
  const messagesBase = user.role === "nurse" ? "/nurse/messages" : "/hospital/messages";
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-3">
        <JobStatusBadge status={job.status} />
        <span className="font-mono text-xs text-muted-foreground">{job.id.toUpperCase()}</span>
      </div>
      <DrawerSection id="drawer-next" title={job.status === "open" ? `Technicians who applied (${job.applicants.length})` : "Next step"}>
        <HospitalJobActions job={job} />
      </DrawerSection>
      <DrawerSection id="drawer-fault" title="Fault details">
        <JobFaultDetails job={job} />
      </DrawerSection>
      {job.technician ? (
        <DrawerSection id="drawer-technician" title="Assigned technician">
          <TechnicianCard technician={job.technician} />
          <Button asChild variant="outline" className="w-full">
            <Link href={`${messagesBase}?thread=${messageThreadId(job.id, job.technician.id)}`}>
              <MessageSquare aria-hidden="true" />
              Message {job.technician.name.split(" ")[0]}
            </Link>
          </Button>
        </DrawerSection>
      ) : null}
      {job.contact ? (
        <DrawerSection id="drawer-contact" title={`Contact details shared${job.poster ? ` by ${job.poster.name}` : ""}`}>
          <JobContactSummary contact={job.contact} />
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
