"use client";

import { CircleCheck } from "lucide-react";
import { ListSkeleton } from "@/components/shared/list-skeleton";
import { MachineCard } from "@/components/shared/machine-card";
import { QueryState } from "@/components/shared/query-state";
import { EmptyState } from "@/components/ui/empty-state";
import { Heading } from "@/components/ui/heading";
import { useMachines } from "@/hooks/use-machines";
import type { Machine } from "@/types";

const isDown = (machine: Machine) => machine.status === "broken" || machine.status === "in_repair";

export function BrokenMachinesList() {
  const query = useMachines();
  return (
    <section aria-labelledby="broken-heading" className="space-y-3">
      <Heading level={2} size="md" id="broken-heading">Currently broken in your hospital</Heading>
      <QueryState
        query={query}
        loading={<ListSkeleton rows={3} className="h-[88px]" />}
        isEmpty={(machines) => !machines.some(isDown)}
        empty={<EmptyState icon={CircleCheck} title="Every machine is working" description="If something breaks, report it and it will show up here." />}
      >
        {(machines) => (
          <ul className="grid gap-3 md:grid-cols-2">
            {machines.filter(isDown).map((machine) => (
              <li key={machine.id}>
                <MachineCard machine={machine} href={`/m/${machine.code}`} />
              </li>
            ))}
          </ul>
        )}
      </QueryState>
    </section>
  );
}
