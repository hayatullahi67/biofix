"use client";

import { Copy, MailCheck, RotateCw, X } from "lucide-react";
import { toast } from "sonner";
import { ListSkeleton } from "@/components/shared/list-skeleton";
import { isEmptyArray, QueryState } from "@/components/shared/query-state";
import { SectionCard } from "@/components/shared/section-card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { useInvites, useResendInvite, useRevokeInvite } from "@/hooks/use-team";
import { absoluteUrl } from "@/lib/seo/site-config";
import { formatRelative, toIsoString } from "@/lib/utils";

export function PendingInvites() {
  const query = useInvites();
  const resend = useResendInvite();
  const revoke = useRevokeInvite();
  const copy = async (code: string) => {
    await navigator.clipboard.writeText(absoluteUrl(`/join/${code}`));
    toast.success("Invite link copied");
  };

  return (
    <SectionCard id="pending-invites" title="Pending invites" description="Invites that haven't been accepted yet">
      <QueryState query={query} loading={<ListSkeleton rows={2} />} isEmpty={isEmptyArray} empty={<EmptyState icon={MailCheck} title="No pending invites" description="Everyone you invited has joined." />}>
        {(invites) => (
          <ul className="-mx-2 divide-y divide-border">
            {invites.map((invite) => (
              <li key={invite.id} className="flex flex-col gap-3 px-2 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{invite.name}{invite.ward ? <span className="font-normal text-muted-foreground"> · {invite.ward}</span> : null}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {invite.contact} · sent <time dateTime={toIsoString(invite.lastSentAt)}>{formatRelative(invite.lastSentAt)}</time>
                  </p>
                </div>
                <div className="flex gap-1.5">
                  <Button variant="ghost" size="sm" onClick={() => void copy(invite.code)} aria-label={`Copy invite link for ${invite.name}`}>
                    <Copy aria-hidden="true" />
                    Copy link
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => resend.mutate(invite.id)} loading={resend.isPending && resend.variables === invite.id}>
                    <RotateCw aria-hidden="true" />
                    Resend
                  </Button>
                  <Button variant="ghost" size="icon-sm" onClick={() => revoke.mutate(invite.id)} aria-label={`Cancel invite for ${invite.name}`}>
                    <X aria-hidden="true" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </QueryState>
    </SectionCard>
  );
}
