"use client";

import { ReportFaultForm } from "@/components/nurse/report-fault-form";
import { ListSkeleton } from "@/components/shared/list-skeleton";
import { QueryState } from "@/components/shared/query-state";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useMachines } from "@/hooks/use-machines";

interface NewJobDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPosted: (jobId: string) => void;
}

export function NewJobDialog({ open, onOpenChange, onPosted }: NewJobDialogProps) {
  const machines = useMachines();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent title="Post a repair job" description="Describe the fault and how technicians can reach you." size="lg">
        <QueryState query={machines} loading={<ListSkeleton rows={4} className="h-24" />}>
          {(list) => <ReportFaultForm machines={list} initialMachineId="" alwaysPost onCreated={(created) => onPosted(created.job.id)} />}
        </QueryState>
      </DialogContent>
    </Dialog>
  );
}
