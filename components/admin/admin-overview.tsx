"use client";

import { Building2, ClipboardList, MonitorCog, ShieldCheck } from "lucide-react";
import { ChartCard } from "@/components/shared/charts/chart-card";
import { PageHeader } from "@/components/shared/page-header";
import { QueryState } from "@/components/shared/query-state";
import { StatCard, StatCardsSkeleton, StatGrid } from "@/components/shared/stat-card";
import { useJobsPostedSeries, usePlatformStats, useRepairsCompletedSeries } from "@/hooks/use-admin";
import { AttentionList } from "./attention-list";

export function AdminOverview() {
  const stats = usePlatformStats();
  const posted = useJobsPostedSeries();
  const completed = useRepairsCompletedSeries();
  return (
    <div className="space-y-6 lg:space-y-8">
      <PageHeader eyebrow="Platform" title="Biofix overview" description="Hospitals, technicians, machines and repair jobs across the platform." />
      <QueryState query={stats} loadingLabel="Loading platform stats" loading={<StatGrid><StatCardsSkeleton /></StatGrid>}>
        {(data) => (
          <>
            <StatGrid>
              <StatCard label="Hospitals" value={data.hospitals} icon={Building2} footnote="Using Biofix for free" />
              <StatCard label="Verified technicians" value={data.technicians} icon={ShieldCheck} tone="success" footnote={`${data.pendingVerifications} awaiting review`} />
              <StatCard label="Jobs" value={data.jobs} icon={ClipboardList} tone="info" footnote="All time" />
              <StatCard label="Machines tracked" value={data.machines} icon={MonitorCog} tone="warning" footnote="Across all hospitals" />
            </StatGrid>
            <div className="grid gap-6 lg:grid-cols-2">
              <ChartCard id="posted-chart" title="Jobs posted by month" description="Repair jobs hospitals posted to technicians" query={posted} kind="bar" seriesLabel="Jobs posted" />
              <ChartCard id="completed-chart" title="Repairs completed by month" description="Repairs confirmed by hospitals" query={completed} kind="area" seriesLabel="Repairs" />
            </div>
            <AttentionList stats={data} />
          </>
        )}
      </QueryState>
    </div>
  );
}
