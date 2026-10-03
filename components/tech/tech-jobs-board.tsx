"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { TabCount, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useOpenJobs, useTechnicianJobs } from "@/hooks/use-jobs";
import { useCurrentUser } from "@/hooks/use-session";
import { activeTechnicianStatuses } from "@/lib/domain/job-flow";
import type { JobDetails } from "@/types";
import { JobList } from "./job-list";
import { VerificationBanner } from "./verification-banner";

type MyFilter = "applied" | "active" | "completed";

const byDistance = (jobs: JobDetails[]) => [...jobs].sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0));

export function TechJobsBoard() {
  const user = useCurrentUser();
  const openJobs = useOpenJobs();
  const myJobs = useTechnicianJobs();
  const [myFilter, setMyFilter] = useState<MyFilter>("active");
  const isActive = (job: JobDetails) => activeTechnicianStatuses.includes(job.status);
  const isApplied = (job: JobDetails) => job.status === "open";
  const selectMine = (jobs: JobDetails[]) =>
    jobs.filter((job) => (myFilter === "applied" ? isApplied(job) : myFilter === "active" ? isActive(job) : !isActive(job) && !isApplied(job)));

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Jobs" title={`Welcome, ${user.name.split(" ")[0]}`} description="Repair jobs posted by hospitals that match your skills. Apply, or reach out to the hospital directly." />
      <VerificationBanner />
      <Tabs defaultValue="all">
        <TabsList aria-label="Job views" className="w-full sm:w-auto">
          <TabsTrigger value="all" className="flex-1 sm:flex-none">All jobs <TabCount value={openJobs.data?.length} /></TabsTrigger>
          <TabsTrigger value="near" className="flex-1 sm:flex-none">Near me</TabsTrigger>
          <TabsTrigger value="mine" className="flex-1 sm:flex-none">My jobs <TabCount value={myJobs.data?.filter(isActive).length} /></TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <JobList query={openJobs} emptyTitle="No open jobs right now" emptyDescription="New jobs matching your skills will appear here. Add more skills on your profile to see more." />
        </TabsContent>
        <TabsContent value="near">
          <JobList query={openJobs} select={byDistance} emptyTitle="No jobs near you" emptyDescription="We'll show open jobs sorted by distance from your location." />
        </TabsContent>
        <TabsContent value="mine" className="space-y-5">
          <SegmentedControl name="my-jobs-filter" legend="Show" options={[{ value: "applied", label: "Applied" }, { value: "active", label: "Active" }, { value: "completed", label: "Completed" }]} value={myFilter} onChange={setMyFilter} className="max-w-sm [&_legend]:sr-only" />
          <JobList
            query={myJobs}
            select={selectMine}
            showStatus
            emptyTitle={{ applied: "No pending applications", active: "No active jobs", completed: "No completed jobs yet" }[myFilter]}
            emptyDescription={
              {
                applied: "Jobs you've shown interest in appear here until the hospital picks a technician.",
                active: "When a hospital assigns you a job, it shows up here.",
                completed: "Jobs you finish will show here with their payment status.",
              }[myFilter]
            }
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
