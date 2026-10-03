"use client";

import { Download, FileText } from "lucide-react";
import { toast } from "sonner";
import { ListSkeleton } from "@/components/shared/list-skeleton";
import { isEmptyArray, QueryState } from "@/components/shared/query-state";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { useMachineDocuments } from "@/hooks/use-machines";
import { formatDate, toIsoString } from "@/lib/utils";

export function MachineDocuments({ machineId }: { machineId: string }) {
  const query = useMachineDocuments(machineId);
  return (
    <QueryState
      query={query}
      loading={<ListSkeleton rows={3} />}
      isEmpty={isEmptyArray}
      empty={<EmptyState icon={FileText} title="No documents" description="Upload manuals, warranties and service reports." />}
    >
      {(documents) => (
        <ul className="-mx-2 divide-y divide-border">
          {documents.map((document) => (
            <li key={document.id} className="flex items-center gap-3 px-2 py-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <FileText className="size-4" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium">{document.name}</span>
                <span className="block text-xs text-muted-foreground">
                  {(document.sizeKb / 1024).toFixed(1)} MB · <time dateTime={toIsoString(document.uploadedAt)}>{formatDate(document.uploadedAt)}</time>
                </span>
              </span>
              <Button variant="ghost" size="icon-sm" aria-label={`Download ${document.name}`} onClick={() => toast.success(`${document.name} downloaded`)}>
                <Download aria-hidden="true" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </QueryState>
  );
}
