"use client";

import { ScanSearch } from "lucide-react";
import { MachineDetailsList } from "@/components/shared/machine-details-list";
import { MachineHistory } from "@/components/shared/machine-history";
import { MachinePhoto } from "@/components/shared/machine-photo";
import { SectionCard } from "@/components/shared/section-card";
import { MachineStatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Heading } from "@/components/ui/heading";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { useMachineByCode } from "@/hooks/use-machines";
import { MachinePrimaryAction } from "./machine-primary-action";

export function MachinePublicView({ code }: { code: string }) {
  const query = useMachineByCode(code);
  if (query.isPending) return <div role="status" className="space-y-4"><span className="sr-only">Loading machine</span><Skeleton className="aspect-[10/7] rounded-2xl" /><Skeleton className="h-40 rounded-2xl" /></div>;
  if (query.isError) {
    const notFound = query.error.message.includes("not found");
    return notFound ? (
      <EmptyState icon={ScanSearch} title="Machine not found" description={`No machine is registered with the code ${code}. Check the sticker and try again.`} />
    ) : (
      <ErrorState message={query.error.message} onRetry={() => void query.refetch()} />
    );
  }
  const machine = query.data;
  return (
    <article aria-labelledby="machine-heading" className="space-y-6">
      <MachinePhoto src={machine.photoUrl} alt={`${machine.name}, ${machine.type}`} caption={`${machine.brand} ${machine.model}`} priority sizes="(min-width: 768px) 720px, 100vw" />
      <header className="space-y-2">
        <MachineStatusBadge status={machine.status} />
        <Heading level={1} id="machine-heading">{machine.name}</Heading>
        <p className="text-sm text-muted-foreground">{machine.type} · {machine.ward}</p>
      </header>
      <MachinePrimaryAction machine={machine} />
      <SectionCard id="machine-summary" title="Service">
        <MachineDetailsList machine={machine} compact />
      </SectionCard>
      <SectionCard id="recent-history" title="Recent history">
        <MachineHistory machineId={machine.id} limit={4} />
      </SectionCard>
    </article>
  );
}
