"use client";

import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { JobContactSummary } from "@/components/shared/job-contact-summary";
import { SectionCard } from "@/components/shared/section-card";
import { Button } from "@/components/ui/button";
import { messageThreadId } from "@/hooks/use-messages";
import { useCurrentUser } from "@/hooks/use-session";
import type { JobDetails } from "@/types";

export function HospitalContactCard({ job }: { job: JobDetails }) {
  const user = useCurrentUser();
  if (!job.contact) return null;
  const visible = job.status === "open" || job.technicianId === user.id;
  if (!visible) return null;
  return (
    <SectionCard id="hospital-contact" title="Contact the hospital" description="Reach out before you apply, or to coordinate the repair.">
      <div className="space-y-4">
        <JobContactSummary contact={job.contact} linkable />
        {job.contact.allowMessages ? (
          <Button asChild variant="outline" className="w-full">
            <Link href={`/tech/messages?thread=${messageThreadId(job.id, user.id)}`}>
              <MessageSquare aria-hidden="true" />
              Message in Biofix
            </Link>
          </Button>
        ) : null}
      </div>
    </SectionCard>
  );
}
