"use client";

import { ReportFaultForm } from "@/components/nurse/report-fault-form";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { Machine } from "@/types";

interface AdminReportDialogProps {
  machine: Machine;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AdminReportDialog({ machine, open, onOpenChange }: AdminReportDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent title={`Report fault: ${machine.name}`} description="The job will appear on your Jobs page." size="lg">
        <ReportFaultForm machines={[machine]} initialMachineId={machine.id} onCreated={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
