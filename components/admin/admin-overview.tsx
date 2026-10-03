"use client";

import { Banknote, Building2, ClipboardList, ShieldCheck } from "lucide-react";
import { ChartCard } from "@/components/shared/charts/chart-card";
import { PageHeader } from "@/components/shared/page-header";
import { QueryState } from "@/components/shared/query-state";
import { StatCard, StatCardsSkeleton, StatGrid } from "@/components/shared/stat-card";
import { useJobsSeries, usePlatformStats, useRevenueSeries } from "@/hooks/use-admin";
import { formatCompactNaira, formatNaira } from "@/lib/utils";
import { AttentionList } from "./attention-list";

export function AdminOverview() {
  const stats = usePlatformStats();
  const revenue = useRevenueSeries();
  const jobs = useJobsSeries();
  return (
    <div className="space-y-6 lg:space-y-8">
      <PageHeader eyebrow="Platform" title="Biofix overview" description="Hospitals, technicians, jobs and revenue across the platform." />
      <QueryState query={stats} loadingLabel="Loading platform stats" loading={<StatGrid><StatCardsSkeleton /></StatGrid>}>
        {(data) => (
          <>
            <StatGrid>
              <StatCard label="Hospitals" value={data.hospitals} icon={Building2} footnote="On Free and Premium" />
              <StatCard label="Verified technicians" value={data.technicians} icon={ShieldCheck} tone="success" footnote={`${data.pendingVerifications} awaiting review`} />
              <StatCard label="Jobs" value={data.jobs} icon={ClipboardList} tone="info" footnote="All time" />
              <StatCard label="Revenue" value={formatCompactNaira(data.revenue)} icon={Banknote} tone="warning" footnote="Hospital subscriptions" />
            </StatGrid>
            <div className="grid gap-6 lg:grid-cols-2">
              <ChartCard id="revenue-chart" title="Revenue by month" description="Hospital subscription revenue" query={revenue} kind="area" seriesLabel="Revenue" formatValue={formatNaira} formatAxis={formatCompactNaira} />
              <ChartCard id="jobs-chart" title="Jobs by month" description="Repair jobs settled on Biofix" query={jobs} kind="bar" seriesLabel="Jobs" />
            </div>
            <AttentionList stats={data} />
          </>
        )}
      </QueryState>
    </div>
  );
}
