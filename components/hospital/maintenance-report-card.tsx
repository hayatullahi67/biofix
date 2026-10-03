"use client";

import { FileDown, FileText } from "lucide-react";
import { SectionCard } from "@/components/shared/section-card";
import { Button } from "@/components/ui/button";
import { useMachines } from "@/hooks/use-machines";
import { useMaintenanceReport } from "@/hooks/use-payments";
import { machineStatusMeta } from "@/lib/domain/status-meta";
import { formatDate } from "@/lib/utils";
import { createTextPdf, downloadBlob } from "@/lib/utils/pdf";

export function MaintenanceReportCard() {
  const machines = useMachines();
  const report = useMaintenanceReport();

  const download = () =>
    report.mutate(undefined, {
      onSuccess: ({ fileName }) => {
        const lines = (machines.data ?? []).map(
          (machine) => `${machine.code}  ${machine.name} (${machine.ward}): ${machineStatusMeta[machine.status].label}. Last service ${formatDate(machine.lastServiceDate)}, next ${formatDate(machine.nextServiceDate)}`,
        );
        downloadBlob(createTextPdf(`Biofix maintenance report, ${formatDate(new Date())}`, lines), fileName);
      },
    });

  return (
    <SectionCard id="report-heading" title="Maintenance report" description="Every machine's status and service history, ready for NHIA accreditation and audits.">
      <div className="flex flex-col gap-4 rounded-xl border border-dashed border-border bg-muted/40 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-card text-primary shadow-[var(--shadow-soft)]">
            <FileText className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-medium">Full equipment report (PDF)</p>
            <p className="text-xs text-muted-foreground">{machines.data?.length ?? "…"} machines · generated now</p>
          </div>
        </div>
        <Button onClick={download} loading={report.isPending} disabled={!machines.data}>
          <FileDown aria-hidden="true" />
          Download report
        </Button>
      </div>
    </SectionCard>
  );
}
