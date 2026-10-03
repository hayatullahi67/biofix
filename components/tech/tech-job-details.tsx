"use client";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { JobFaultDetails } from "@/components/shared/job-fault-details";
import { MachineHistory } from "@/components/shared/machine-history";
import { PageHeader } from "@/components/shared/page-header";
import { QueryState } from "@/components/shared/query-state";
import { SectionCard } from "@/components/shared/section-card";
import { JobStatusBadge, UrgencyBadge } from "@/components/shared/status-badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useJob } from "@/hooks/use-jobs";
import { formatNaira } from "@/lib/utils";
import { HospitalInfoCard } from "./hospital-info-card";
import { JobProgress } from "./job-progress";
import { TechJobActions } from "./tech-job-actions";

export function TechJobDetails({ id }: { id: string }) {
  const query = useJob(id);
  return (
    <QueryState query={query} loadingLabel="Loading job" loading={<div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]"><Skeleton className="h-[560px] rounded-2xl" /><Skeleton className="h-[420px] rounded-2xl" /></div>}>
      {(job) => (
        <div className="space-y-6">
          <Breadcrumbs items={[{ label: "Jobs", href: "/tech" }, { label: job.machine.name }]} />
          <PageHeader
            eyebrow={job.machine.type}
            title={`${job.report.category}: ${job.machine.name}`}
            description={<span className="flex flex-wrap items-center gap-2"><JobStatusBadge status={job.status} /><UrgencyBadge urgency={job.report.urgency} /><span className="font-semibold text-foreground tabular-nums">{formatNaira(job.quote?.total ?? job.estimatedPay)}</span></span>}
          />
          <div className="grid items-start gap-6 lg:grid-cols-[1.3fr_1fr]">
            <div className="order-2 space-y-6 lg:order-1">
              <SectionCard id="fault-info" title="Fault details">
                <JobFaultDetails job={job} />
              </SectionCard>
              <SectionCard id="machine-history" title="Machine history" description={`${job.machine.brand} ${job.machine.model} · ${job.machine.serialNumber}`}>
                <MachineHistory machineId={job.machine.id} limit={5} />
              </SectionCard>
            </div>
            <div className="order-1 space-y-6 lg:sticky lg:top-24 lg:order-2">
              <Card as="section" aria-labelledby="actions-heading" className="space-y-5 p-5 sm:p-6">
                <h2 id="actions-heading" className="text-base font-semibold tracking-tight">Your next step</h2>
                <JobProgress status={job.status} />
                <TechJobActions job={job} />
              </Card>
              <HospitalInfoCard hospital={job.hospital} distanceKm={job.distanceKm} />
            </div>
          </div>
        </div>
      )}
    </QueryState>
  );
}
