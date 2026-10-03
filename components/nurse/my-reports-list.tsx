"use client";

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
import { formatRelative, toIsoString } from "@/lib/utils";

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
              {reports.map(({ report, machine, jobStatus }) => (
                <li key={report.id}>
                  <article className="flex items-center justify-between gap-3 px-4 py-3.5 sm:px-5">
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-medium">{machine.name}</h3>
                      <p className="truncate text-xs text-muted-foreground">
                        {report.category} · <time dateTime={toIsoString(report.createdAt)}>{formatRelative(report.createdAt)}</time> · <span className="font-mono">{report.id}</span>
                      </p>
                    </div>
                    <JobStatusBadge status={jobStatus} />
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
