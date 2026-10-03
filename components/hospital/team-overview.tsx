"use client";

import { UserPlus } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { InviteNurseDialog } from "./invite-nurse-dialog";
import { NursesTable } from "./nurses-table";
import { PendingInvites } from "./pending-invites";

export function TeamOverview() {
  const [inviteOpen, setInviteOpen] = useState(false);
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Team"
        title="Your team"
        description="Nurses report broken machines. Only you can invite or remove them."
        actions={
          <Button onClick={() => setInviteOpen(true)}>
            <UserPlus aria-hidden="true" />
            Invite nurse
          </Button>
        }
      />
      <section aria-labelledby="nurses-heading" className="space-y-3">
        <Heading level={2} size="md" id="nurses-heading">Nurses</Heading>
        <NursesTable onInvite={() => setInviteOpen(true)} />
      </section>
      <PendingInvites />
      <InviteNurseDialog open={inviteOpen} onOpenChange={setInviteOpen} />
    </div>
  );
}
