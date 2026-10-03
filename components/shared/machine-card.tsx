import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Machine } from "@/types";
import { MachineStatusBadge } from "./status-badge";

interface MachineCardProps {
  machine: Machine;
  href: string;
  meta?: React.ReactNode;
}

export function MachineCard({ machine, href, meta }: MachineCardProps) {
  return (
    <Card as="article" interactive className="group relative flex items-center gap-4 p-3 pr-4">
      <div className="relative size-16 shrink-0 overflow-hidden rounded-xl border border-border bg-muted">
        <Image src={machine.photoUrl} alt={`${machine.name}, ${machine.type}`} fill sizes="64px" className="object-cover" />
      </div>
      <div className="min-w-0 flex-1 space-y-1.5">
        <h3 className="truncate text-sm font-semibold">
          <Link href={href} className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none">
            {machine.name}
          </Link>
        </h3>
        <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
          <MapPin className="size-3" aria-hidden="true" />
          {machine.ward} · {machine.code}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <MachineStatusBadge status={machine.status} />
          {meta}
        </div>
      </div>
    </Card>
  );
}
