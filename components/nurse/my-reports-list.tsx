"use client";

import Image from "next/image";
import Link from "next/link";
import { ClipboardList } from "lucide-react";
import { ListSkeleton } from "@/components/shared/list-skeleton";
import { isEmptyArray, QueryState } from "@/components/shared/query-state";
import { JobStatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Heading } from "@/components/ui/heading";
import { useMyReports } from "@/hooks/use-jobs";
import { formatDateTime, toIsoString } from "@/lib/utils";
import { PostReportButton } from "./post-report-button";

export function MyReportsList() {
  const query = useMyReports();
  return (
    <section aria-labelledby="my-reports-heading" className="space-y-3">
      <Heading level={2} size="md" id="my-reports-heading">My reports</Heading>
      <QueryState
        query={query}
        loading={<ListSkeleton rows={3} />}
        isEmpty={isEmptyArray}
        empty={<EmptyState icon={ClipboardList} title="No reports yet" description="Faults you report will appear here with live status updates." action={<Button asChild variant="outline"><Link href="/nurse/report">Report a fault</Link></Button>} />}
      >
        {(reports) => (
          <Card className="divide-y divide-border overflow-hidden">
            <ul className="divide-y divide-border">
              {reports.map(({ report, machine, jobId, jobStatus }) => (
                <li key={report.id}>
                  <article className="grid grid-cols-[56px_1fr] items-center gap-x-3 gap-y-2 px-4 py-3.5 sm:flex sm:px-5">
                    <span className="relative size-14 shrink-0 overflow-hidden rounded-xl border border-border bg-muted">
                      <Image
                        src={report.photos[0] ?? machine.photoUrl}
                        alt={`Fault photo of ${machine.name}`}
                        fill
                        sizes="56px"
                        className="object-cover"
                        unoptimized={(report.photos[0] ?? "").startsWith("data:")}
                      />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-medium">{machine.name}</h3>
                      <p className="truncate text-xs text-muted-foreground">
                        {report.category} · <span className="font-mono">{report.id}</span>
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        <time dateTime={toIsoString(report.createdAt)}>{formatDateTime(report.createdAt)}</time>
                      </p>
                    </div>
                    <div className="col-start-2 flex shrink-0 flex-wrap items-center gap-2">
                      <JobStatusBadge status={jobStatus} />
                      {jobStatus === "reported" && jobId ? <PostReportButton jobId={jobId} machineName={machine.name} /> : null}
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </Card>
        )}
      </QueryState>
    </section>
  );
}
