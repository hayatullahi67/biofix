"use client";

import { Clock, Landmark, Wallet, TrendingUp } from "lucide-react";
import { useState } from "react";
import { ChartCard } from "@/components/shared/charts/chart-card";
import { PageHeader } from "@/components/shared/page-header";
import { QueryState } from "@/components/shared/query-state";
import { StatCard, StatCardsSkeleton } from "@/components/shared/stat-card";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { useEarningsByMonth, useEarningsSummary } from "@/hooks/use-payments";
import { useMyTechnicianProfile } from "@/hooks/use-technicians";
import { formatCompactNaira, formatNaira } from "@/lib/utils";
import { TransactionsTable } from "./transactions-table";
import { WithdrawDialog } from "./withdraw-dialog";

export function EarningsOverview() {
  const summary = useEarningsSummary();
  const monthly = useEarningsByMonth();
  const profile = useMyTechnicianProfile();
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Earnings"
        title="Your earnings"
        description="Payments are released as soon as hospitals confirm your repairs."
        actions={<Button onClick={() => setWithdrawOpen(true)} disabled={!summary.data?.available}><Landmark aria-hidden="true" />Withdraw to bank</Button>}
      />
      <QueryState query={summary} loading={<div className="grid gap-3 sm:grid-cols-3"><StatCardsSkeleton count={3} /></div>}>
        {(data) => (
          <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
            <StatCard label="Total earned" value={formatNaira(data.totalEarned)} icon={TrendingUp} tone="primary" footnote="All time" />
            <StatCard label="Pending" value={formatNaira(data.pending)} icon={Clock} tone="warning" footnote="In escrow on active jobs" />
            <StatCard label="Available" value={formatNaira(data.available)} icon={Wallet} tone="success" footnote="Ready to withdraw" />
          </div>
        )}
      </QueryState>
      <ChartCard id="earnings-chart" title="Earnings by month" description="Job payments released in the last 6 months" query={monthly} kind="area" seriesLabel="Earnings" formatValue={formatNaira} formatAxis={formatCompactNaira} />
      <section aria-labelledby="transactions-heading" className="space-y-3">
        <Heading level={2} size="md" id="transactions-heading">Transactions</Heading>
        <TransactionsTable />
      </section>
      <WithdrawDialog open={withdrawOpen} onOpenChange={setWithdrawOpen} available={summary.data?.available ?? 0} bankAccount={profile.data?.bankAccount} />
    </div>
  );
}
