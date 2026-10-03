"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { QueryState } from "@/components/shared/query-state";
import { ListSkeleton } from "@/components/shared/list-skeleton";
import { useMachines } from "@/hooks/use-machines";
import type { CreatedReport, Machine } from "@/types";
import { ReportFaultForm } from "./report-fault-form";
import { ReportSuccess } from "./report-success";

export function ReportFaultFlow() {
  const searchParams = useSearchParams();
  const machines = useMachines();
  const [result, setResult] = useState<{ created: CreatedReport; machine: Machine } | null>(null);
  const [formKey, setFormKey] = useState(0);
  const preselect = searchParams.get("machine")?.toLowerCase() ?? "";

  if (result) {
    return <ReportSuccess created={result.created} machine={result.machine} onReset={() => { setResult(null); setFormKey((key) => key + 1); }} />;
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <PageHeader eyebrow="Report fault" title="Report a broken machine" description="Takes less than a minute. Your admin is notified straight away." />
      <QueryState query={machines} loadingLabel="Loading machines" loading={<ListSkeleton rows={5} className="h-28" />}>
        {(list) => {
          const initial = list.find((machine) => machine.code.toLowerCase() === preselect || machine.id === preselect)?.id ?? "";
          return <ReportFaultForm key={`${formKey}-${initial}`} machines={list} initialMachineId={initial} onCreated={(created, machine) => setResult({ created, machine })} />;
        }}
      </QueryState>
    </div>
  );
}
