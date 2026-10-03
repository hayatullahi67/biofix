"use client";

import { Plus, Wrench } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { JobCard } from "@/components/shared/job-card";
import { ListSkeleton } from "@/components/shared/list-skeleton";
import { PageHeader } from "@/components/shared/page-header";
import { QueryState } from "@/components/shared/query-state";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { TabCount, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useHospitalJobs } from "@/hooks/use-jobs";
import { jobTabStatuses } from "@/lib/domain/job-flow";
import type { JobDetails, JobTab } from "@/types";
import { HospitalJobDrawer } from "./hospital-job-drawer";
import { NewJobDialog } from "./new-job-dialog";

const tabs: { value: JobTab; label: string; empty: string }[] = [
  { value: "reported", label: "Fault reports", empty: "Faults reported by nurses that haven't been posted yet will show here." },
  { value: "open", label: "Open to technicians", empty: "Jobs you've posted that are waiting for a technician will show here." },
  { value: "in_progress", label: "In progress", empty: "Jobs a technician is working on will show here." },
  { value: "completed", label: "Completed", empty: "Finished repairs will show here." },
  { value: "all", label: "All", empty: "When nurses report faults, the jobs show up in this list." },
];

const inTab = (tab: JobTab) => (job: JobDetails) => jobTabStatuses[tab].includes(job.status);

export function JobsBoard() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<JobTab>("reported");
  const [creating, setCreating] = useState(false);
  const query = useHospitalJobs();
  const jobId = searchParams.get("job");
  const jobHref = (id: string) => `${pathname}?job=${id}`;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Jobs"
        title="Repair jobs"
        description="Post faults as jobs, pick a technician from those who apply, and track every repair to completion."
        actions={
          <Button onClick={() => setCreating(true)}>
            <Plus aria-hidden="true" />
            Post a job
          </Button>
        }
      />
      <Tabs value={tab} onValueChange={(value) => setTab(value as JobTab)}>
        <TabsList aria-label="Filter jobs by status">
          {tabs.map((item) => (
            <TabsTrigger key={item.value} value={item.value}>
              {item.label}
              <TabCount value={query.data?.filter(inTab(item.value)).length} />
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((item) => (
          <TabsContent key={item.value} value={item.value}>
            <QueryState
              query={query}
              loading={<ListSkeleton rows={4} className="h-48" />}
              isEmpty={(jobs) => !jobs.some(inTab(item.value))}
              empty={<EmptyState icon={Wrench} title="Nothing here yet" description={item.empty} />}
            >
              {(jobs) => (
                <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {jobs.filter(inTab(item.value)).map((job) => (
                    <li key={job.id}>
                      <JobCard job={job} href={jobHref(job.id)} showStatus headingLevel={2} />
                    </li>
                  ))}
                </ul>
              )}
            </QueryState>
          </TabsContent>
        ))}
      </Tabs>
      <NewJobDialog
        open={creating}
        onOpenChange={setCreating}
        onPosted={(id) => {
          setCreating(false);
          setTab("open");
          router.replace(jobHref(id), { scroll: false });
        }}
      />
      <HospitalJobDrawer jobId={jobId} onClose={() => router.replace(pathname, { scroll: false })} />
    </div>
  );
}
