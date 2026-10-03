"use client";

import { ClipboardList, Scale } from "lucide-react";
import { DataTable } from "@/components/shared/data-table";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { TabCount, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDisputes, useResolveDispute } from "@/hooks/use-admin";
import { useAllJobs } from "@/hooks/use-jobs";
import { disputeColumns, jobColumns } from "./admin-job-columns";

export function JobsAdmin() {
  const jobs = useAllJobs();
  const disputes = useDisputes();
  const resolve = useResolveDispute();
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Jobs" title="Jobs and disputes" description="Monitor every repair job and resolve disputes between hospitals and technicians." />
      <Tabs defaultValue="jobs">
        <TabsList aria-label="Job views">
          <TabsTrigger value="jobs">All jobs <TabCount value={jobs.data?.length} /></TabsTrigger>
          <TabsTrigger value="disputes">Disputes <TabCount value={disputes.data?.filter((dispute) => dispute.status === "open").length} /></TabsTrigger>
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
      </Tabs>
    </div>
  );
}
