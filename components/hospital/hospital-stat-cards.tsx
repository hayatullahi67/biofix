"use client";

import { Activity, CircleCheck, TriangleAlert, Wrench } from "lucide-react";
import { QueryState } from "@/components/shared/query-state";
import { StatCard, StatCardsSkeleton, StatGrid } from "@/components/shared/stat-card";
import { useHospitalStats } from "@/hooks/use-hospital-stats";

export function HospitalStatCards() {
  const query = useHospitalStats();
  return (
    <QueryState query={query} loadingLabel="Loading equipment stats" loading={<StatGrid><StatCardsSkeleton /></StatGrid>}>
      {(stats) => (
        <StatGrid>
          <StatCard label="Total machines" value={stats.totalMachines} icon={Activity} tone="primary" footnote="Across all wards" />
          <StatCard label="Working" value={stats.working} icon={CircleCheck} tone="success" footnote={`${Math.round((stats.working / Math.max(1, stats.totalMachines)) * 100)}% uptime`} />
          <StatCard label="Due for service" value={stats.dueService} icon={Wrench} tone="warning" footnote="Book preventive maintenance" />
          <StatCard label="Broken" value={stats.broken} icon={TriangleAlert} tone="danger" footnote="Including machines in repair" />
        </StatGrid>
      )}
    </QueryState>
  );
}
