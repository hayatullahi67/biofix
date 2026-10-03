"use client";

import { History } from "lucide-react";
import { useMachineEvents } from "@/hooks/use-machines";
import type { MachineEventType } from "@/types";
import { EmptyState } from "@/components/ui/empty-state";
import { ListSkeleton } from "./list-skeleton";
import { isEmptyArray, QueryState } from "./query-state";
import { Timeline, type TimelineTone } from "./timeline";

const tones: Record<MachineEventType, TimelineTone> = { installed: "muted", service: "success", fault: "danger", repair: "info" };

export function MachineHistory({ machineId, limit }: { machineId: string; limit?: number }) {
  const query = useMachineEvents(machineId);
  return (
    <QueryState
      query={query}
      loading={<ListSkeleton rows={4} className="h-12" />}
      isEmpty={isEmptyArray}
      empty={<EmptyState icon={History} title="No history yet" description="Faults, repairs and services will appear here." />}
    >
      {(events) => (
        <Timeline
          label="Machine history"
          items={events.slice(0, limit).map((event) => ({
            id: event.id,
            title: event.title,
            description: event.description,
            at: event.date,
            actor: event.actor,
            tone: tones[event.type],
          }))}
        />
      )}
    </QueryState>
  );
}
