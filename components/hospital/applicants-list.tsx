"use client";

import Link from "next/link";
import { MessageSquare, UserCheck, Users } from "lucide-react";
import { TechnicianCard } from "@/components/shared/technician-card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { useAssignTechnician } from "@/hooks/use-job-posting";
import { messageThreadId } from "@/hooks/use-messages";
import { useCurrentUser } from "@/hooks/use-session";
import { formatRelative, toIsoString } from "@/lib/utils";
import type { JobDetails } from "@/types";

export function ApplicantsList({ job }: { job: JobDetails }) {
  const user = useCurrentUser();
  const assign = useAssignTechnician();
  const canAssign = user.role === "hospital_admin";
  const messagesBase = user.role === "nurse" ? "/nurse/messages" : "/hospital/messages";

  if (job.applicants.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="Waiting for technicians"
        description="The job is live. Verified technicians nearby can apply, call, email or message you."
        className="py-8"
      />
    );
  }

  return (
    <ul className="space-y-4">
      {job.applicants.map((applicant) => (
        <li key={applicant.id} className="space-y-3 rounded-2xl border border-border bg-card p-3">
          <TechnicianCard technician={applicant.technician} />
          <blockquote className="rounded-xl bg-muted/60 px-4 py-3 text-sm leading-relaxed">
            &ldquo;{applicant.message}&rdquo;
            <footer className="mt-1 text-xs text-muted-foreground">
              Applied <time dateTime={toIsoString(applicant.createdAt)}>{formatRelative(applicant.createdAt)}</time>
            </footer>
          </blockquote>
          <div className="grid grid-cols-2 gap-2">
            <Button asChild variant="outline">
              <Link href={`${messagesBase}?thread=${messageThreadId(job.id, applicant.technicianId)}`}>
                <MessageSquare aria-hidden="true" />
                Message
              </Link>
            </Button>
            {canAssign ? (
              <Button
                onClick={() => assign.mutate({ jobId: job.id, technicianId: applicant.technicianId })}
                loading={assign.isPending && assign.variables?.technicianId === applicant.technicianId}
              >
                <UserCheck aria-hidden="true" />
                Assign
              </Button>
            ) : (
              <p className="flex items-center text-xs text-muted-foreground">Your admin assigns the technician.</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
