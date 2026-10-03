"use client";

import Link from "next/link";
import { ExternalLink, Printer } from "lucide-react";
import { useState } from "react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { MachineDetailsList } from "@/components/shared/machine-details-list";
import { MachineHistory } from "@/components/shared/machine-history";
import { MachinePhoto } from "@/components/shared/machine-photo";
import { PageHeader } from "@/components/shared/page-header";
import { QueryState } from "@/components/shared/query-state";
import { SectionCard } from "@/components/shared/section-card";
import { MachineStatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useMachine } from "@/hooks/use-machines";
import { MachineDocuments } from "./machine-documents";
import { PrintStickersDialog } from "./print-stickers-dialog";

function DetailsSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-16 w-72" />
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <Skeleton className="h-[520px] rounded-2xl" />
        <Skeleton className="h-[520px] rounded-2xl" />
      </div>
    </div>
  );
}

export function EquipmentDetails({ id }: { id: string }) {
  const query = useMachine(id);
  const [printOpen, setPrintOpen] = useState(false);
  return (
    <QueryState query={query} loadingLabel="Loading machine" loading={<DetailsSkeleton />}>
      {(machine) => (
        <div className="space-y-6">
          <Breadcrumbs items={[{ label: "Equipment", href: "/hospital/equipment" }, { label: machine.name }]} />
          <PageHeader
            title={machine.name}
            description={<span className="flex flex-wrap items-center gap-2">{machine.brand} {machine.model} <MachineStatusBadge status={machine.status} /></span>}
            actions={
              <>
                <Button asChild variant="outline">
                  <Link href={`/m/${machine.code}`}>
                    <ExternalLink aria-hidden="true" />
                    Open QR page
                  </Link>
                </Button>
                <Button onClick={() => setPrintOpen(true)}>
                  <Printer aria-hidden="true" />
                  Print QR sticker
                </Button>
              </>
            }
          />
          <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            <div className="space-y-6">
              <MachinePhoto src={machine.photoUrl} alt={`${machine.name}, ${machine.type} in ${machine.ward}`} caption={`${machine.type} · ${machine.ward}`} />
              <SectionCard id="machine-info" title="Machine information">
                <MachineDetailsList machine={machine} />
              </SectionCard>
            </div>
            <div className="space-y-6">
              <SectionCard id="machine-history" title="History" description="Faults, repairs and services">
                <MachineHistory machineId={machine.id} />
              </SectionCard>
              <SectionCard id="machine-documents" title="Documents">
                <MachineDocuments machineId={machine.id} />
              </SectionCard>
            </div>
          </div>
          <PrintStickersDialog open={printOpen} onOpenChange={setPrintOpen} machines={[machine]} title="Print QR sticker" />
        </div>
      )}
    </QueryState>
  );
}
