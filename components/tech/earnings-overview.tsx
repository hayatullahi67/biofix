"use client";

import { CircleCheck, Clock, TrendingUp } from "lucide-react";
import { ChartCard } from "@/components/shared/charts/chart-card";
import { PageHeader } from "@/components/shared/page-header";
import { QueryState } from "@/components/shared/query-state";
import { StatCard, StatCardsSkeleton } from "@/components/shared/stat-card";
import { Heading } from "@/components/ui/heading";
import { useEarningsByMonth, useEarningsSummary } from "@/hooks/use-payments";
import { formatCompactNaira, formatNaira } from "@/lib/utils";
import { TransactionsTable } from "./transactions-table";

export function EarningsOverview() {
  const summary = useEarningsSummary();
  const monthly = useEarningsByMonth();

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Earnings" title="Your earnings" description="Hospitals pay you directly by cash or bank transfer. Every payment they record shows up here." />
      <QueryState query={summary} loading={<div className="grid gap-3 sm:grid-cols-3"><StatCardsSkeleton count={3} /></div>}>
        {(data) => (
          <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
            <StatCard label="Total earned" value={formatNaira(data.totalEarned)} icon={TrendingUp} tone="primary" footnote="Recorded by hospitals" />
            <StatCard label="Awaiting payment" value={formatNaira(data.awaitingPayment)} icon={Clock} tone="warning" footnote="Approved jobs not yet paid" />
            <StatCard label="Paid jobs" value={data.paidJobs} icon={CircleCheck} tone="success" footnote="All time" />
          </div>
        )}
      </QueryState>
      <ChartCard id="earnings-chart" title="Earnings by month" description="Payments recorded in the last 6 months" query={monthly} kind="area" seriesLabel="Earnings" formatValue={formatNaira} formatAxis={formatCompactNaira} />
      <section aria-labelledby="transactions-heading" className="space-y-3">
        <Heading level={2} size="md" id="transactions-heading">Payments received</Heading>
        <TransactionsTable />
      </section>
    </div>
  );
}
