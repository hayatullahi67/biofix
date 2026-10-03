"use client";

import { Banknote, ClipboardList, Scale } from "lucide-react";
import { DataTable } from "@/components/shared/data-table";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { TabCount, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDisputes, usePayouts, useResolveDispute } from "@/hooks/use-admin";
import { useAllJobs } from "@/hooks/use-jobs";
import { disputeColumns, jobColumns, payoutColumns } from "./admin-job-columns";

export function JobsAdmin() {
  const jobs = useAllJobs();
  const disputes = useDisputes();
  const payouts = usePayouts();
  const resolve = useResolveDispute();
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Jobs" title="Jobs, disputes and payouts" description="Monitor every repair job and the money moving through Biofix." />
      <Tabs defaultValue="jobs">
        <TabsList aria-label="Job views">
          <TabsTrigger value="jobs">All jobs <TabCount value={jobs.data?.length} /></TabsTrigger>
          <TabsTrigger value="disputes">Disputes <TabCount value={disputes.data?.filter((dispute) => dispute.status === "open").length} /></TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
        </TabsList>
        <TabsContent value="jobs">
          <DataTable caption="All jobs" columns={jobColumns} query={jobs} getRowKey={(job) => job.id} empty={<EmptyState icon={ClipboardList} title="No jobs yet" description="Jobs appear here as hospitals report faults." />} />
        </TabsContent>
        <TabsContent value="disputes">
          <DataTable
            caption="Disputes"
            columns={disputeColumns((id) => resolve.mutate(id), resolve.isPending ? resolve.variables : undefined)}
            query={disputes}
            getRowKey={(dispute) => dispute.id}
            empty={<EmptyState icon={Scale} title="No disputes" description="Disputes raised by hospitals or technicians show up here." />}
          />
        </TabsContent>
        <TabsContent value="payouts">
          <DataTable caption="Technician payouts" columns={payoutColumns} query={payouts} getRowKey={(payout) => payout.id} empty={<EmptyState icon={Banknote} title="No payouts yet" description="Withdrawals by technicians appear here." />} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
