"use client";

import Link from "next/link";
import { MessagesSquare } from "lucide-react";
import { ListSkeleton } from "@/components/shared/list-skeleton";
import { isEmptyArray, QueryState } from "@/components/shared/query-state";
import { Avatar } from "@/components/ui/avatar";
import { EmptyState } from "@/components/ui/empty-state";
import { useThreads } from "@/hooks/use-messages";
import { useCurrentUser } from "@/hooks/use-session";
import { cn, formatRelative, toIsoString } from "@/lib/utils";

export function ThreadList({ basePath, activeId }: { basePath: string; activeId: string | null }) {
  const user = useCurrentUser();
  const query = useThreads();
  const isTechnician = user.role === "technician";
  return (
    <QueryState
      query={query}
      loadingLabel="Loading conversations"
      loading={<ListSkeleton rows={5} className="h-16" />}
      isEmpty={isEmptyArray}
      empty={<EmptyState icon={MessagesSquare} title="No conversations yet" description={isTechnician ? "Message a hospital from any open job to start a conversation." : "When technicians reach out about your jobs, their messages appear here."} />}
    >
      {(threads) => (
        <ul aria-label="Conversations" className="space-y-1">
          {threads.map((thread) => {
            const counterpart = isTechnician ? thread.hospitalName : thread.technicianName;
            return (
              <li key={thread.id}>
                <Link
                  href={`${basePath}?thread=${thread.id}`}
                  aria-current={thread.id === activeId ? "true" : undefined}
                  className={cn("flex gap-3 rounded-xl p-3 transition-colors hover:bg-muted/70", thread.id === activeId && "bg-accent hover:bg-accent")}
                >
                  <Avatar name={counterpart} size="md" />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="truncate text-sm font-semibold">{counterpart}</span>
                      <time dateTime={toIsoString(thread.lastAt)} className="shrink-0 text-[11px] text-muted-foreground">{formatRelative(thread.lastAt)}</time>
                    </span>
                    <span className="block truncate text-xs font-medium text-primary">{thread.machineName}</span>
                    <span className="block truncate text-xs text-muted-foreground">{thread.lastMessage}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </QueryState>
  );
}
