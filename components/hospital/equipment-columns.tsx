import Image from "next/image";
import Link from "next/link";
import type { Column } from "@/components/shared/data-table";
import { MachineStatusBadge } from "@/components/shared/status-badge";
import { formatDate, toIsoString } from "@/lib/utils";
import type { Machine } from "@/types";

export const equipmentColumns: Column<Machine>[] = [
  {
    key: "machine",
    header: "Machine",
    cell: (machine) => (
      <span className="flex items-center gap-3">
        <span className="relative size-10 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
          <Image src={machine.photoUrl} alt="" fill sizes="40px" className="object-cover" unoptimized={machine.photoUrl.startsWith("data:")} />
        </span>
        <span className="min-w-0">
          <Link href={`/hospital/equipment/${machine.id}`} className="block truncate font-medium hover:text-primary hover:underline">
            {machine.name}
          </Link>
          <span className="block font-mono text-xs text-muted-foreground">{machine.code}</span>
        </span>
      </span>
    ),
  },
  { key: "type", header: "Type", cell: (machine) => <span className="text-muted-foreground">{machine.type}</span> },
  { key: "ward", header: "Ward", cell: (machine) => machine.ward },
  { key: "status", header: "Status", cell: (machine) => <MachineStatusBadge status={machine.status} /> },
  {
    key: "next",
    header: "Next service",
    cell: (machine) => (
      <time dateTime={toIsoString(machine.nextServiceDate)} className="tabular-nums text-muted-foreground">
        {formatDate(machine.nextServiceDate)}
      </time>
    ),
  },
];
