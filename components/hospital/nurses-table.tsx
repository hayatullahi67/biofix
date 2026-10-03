"use client";

import { Trash2, Users } from "lucide-react";
import { useState } from "react";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { DataTable, type Column } from "@/components/shared/data-table";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { useNurses, useRemoveNurse } from "@/hooks/use-team";
import { formatDate, toIsoString } from "@/lib/utils";
import type { User } from "@/types";

function NurseIdentity({ nurse }: { nurse: User }) {
  return (
    <span className="flex items-center gap-3">
      <Avatar name={nurse.name} size="sm" />
      <span className="min-w-0">
        <span className="block truncate font-medium">{nurse.name}</span>
        <span className="block truncate text-xs text-muted-foreground">{nurse.email}</span>
      </span>
    </span>
  );
}

export function NursesTable({ onInvite }: { onInvite: () => void }) {
  const query = useNurses();
  const remove = useRemoveNurse();
  const [pending, setPending] = useState<User | null>(null);
  const removeButton = (nurse: User) => (
    <Button variant="ghost" size="icon-sm" onClick={() => setPending(nurse)} aria-label={`Remove ${nurse.name}`}>
      <Trash2 aria-hidden="true" />
    </Button>
  );
  const columns: Column<User>[] = [
    { key: "name", header: "Nurse", cell: (nurse) => <NurseIdentity nurse={nurse} /> },
    { key: "ward", header: "Ward", cell: (nurse) => nurse.ward ?? "—" },
    { key: "phone", header: "Phone", cell: (nurse) => <span className="tabular-nums text-muted-foreground">{nurse.phone || "—"}</span> },
    { key: "joined", header: "Joined", cell: (nurse) => <time dateTime={toIsoString(nurse.createdAt)} className="text-muted-foreground">{formatDate(nurse.createdAt)}</time> },
    { key: "actions", header: "Actions", headerClassName: "sr-only", className: "text-right", cell: removeButton },
  ];

  return (
    <>
      <DataTable
        caption="Nurses in your hospital"
        columns={columns}
        query={query}
        getRowKey={(nurse) => nurse.id}
        mobileCard={(nurse) => (
          <Card as="article" className="flex items-center justify-between gap-3 p-4">
            <NurseIdentity nurse={nurse} />
            {removeButton(nurse)}
          </Card>
        )}
        empty={<EmptyState icon={Users} title="No nurses yet" description="Invite nurses so they can report broken machines from their phones." action={<Button onClick={onInvite}>Invite nurse</Button>} />}
      />
      <ConfirmDialog
        open={Boolean(pending)}
        onOpenChange={(open) => !open && setPending(null)}
        title={`Remove ${pending?.name ?? "nurse"}?`}
        description="They will lose access to your hospital on Biofix. Their past reports are kept."
        confirmLabel="Remove nurse"
        destructive
        loading={remove.isPending}
        onConfirm={() => pending && remove.mutate(pending.id, { onSuccess: () => setPending(null) })}
      />
    </>
  );
}
