"use client";

import Link from "next/link";
import { CalendarCheck } from "lucide-react";
import { ListSkeleton } from "@/components/shared/list-skeleton";
import { isEmptyArray, QueryState } from "@/components/shared/query-state";
import { SectionCard } from "@/components/shared/section-card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { useDueForService } from "@/hooks/use-hospital-stats";
import { formatDate, toIsoString } from "@/lib/utils";

export function DueServiceList() {
  const query = useDueForService();
  return (
    <SectionCard id="due-service" title="Due for service this week" description="Book preventive maintenance before they fail">
      <QueryState
        query={query}
        loading={<ListSkeleton rows={3} />}
        isEmpty={isEmptyArray}
        empty={<EmptyState icon={CalendarCheck} title="Nothing due this week" description="All machines are within their service interval." />}
      >
        {(machines) => (
          <ul className="-mx-2 divide-y divide-border">
            {machines.map((machine) => {
              const overdue = new Date(machine.nextServiceDate).getTime() < Date.now();
              return (
                <li key={machine.id}>
                  <Link href={`/hospital/equipment/${machine.id}`} className="flex items-center justify-between gap-3 rounded-xl px-2 py-3 transition-colors hover:bg-muted/60">
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium">{machine.name}</span>
                      <span className="block truncate text-xs text-muted-foreground">{machine.ward} · {machine.brand} {machine.model}</span>
                    </span>
                    <Badge tone={overdue ? "danger" : "warning"}>
                      {overdue ? "Overdue" : "Due"} <time dateTime={toIsoString(machine.nextServiceDate)}>{formatDate(machine.nextServiceDate, "d MMM")}</time>
                    </Badge>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </QueryState>
    </SectionCard>
  );
}
