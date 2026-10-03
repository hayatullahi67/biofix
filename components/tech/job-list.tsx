"use client";

import type { UseQueryResult } from "@tanstack/react-query";
import { BriefcaseBusiness } from "lucide-react";
import { JobCard } from "@/components/shared/job-card";
import { ListSkeleton } from "@/components/shared/list-skeleton";
import { QueryState } from "@/components/shared/query-state";
import { EmptyState } from "@/components/ui/empty-state";
import type { JobDetails } from "@/types";

interface JobListProps {
  query: UseQueryResult<JobDetails[]>;
  select?: (jobs: JobDetails[]) => JobDetails[];
  emptyTitle: string;
  emptyDescription: string;
  showStatus?: boolean;
}

export function JobList({ query, select = (jobs) => jobs, emptyTitle, emptyDescription, showStatus = false }: JobListProps) {
  return (
    <QueryState
      query={query}
      loadingLabel="Loading jobs"
      loading={<ListSkeleton rows={3} className="h-52" />}
      isEmpty={(jobs) => select(jobs).length === 0}
      empty={<EmptyState icon={BriefcaseBusiness} title={emptyTitle} description={emptyDescription} />}
    >
      {(jobs) => (
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {select(jobs).map((job) => (
            <li key={job.id}>
              <JobCard job={job} href={`/tech/jobs/${job.id}`} showStatus={showStatus} headingLevel={2} />
            </li>
          ))}
        </ul>
      )}
    </QueryState>
  );
}
