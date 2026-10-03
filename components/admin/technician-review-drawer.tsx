"use client";

import { FileText } from "lucide-react";
import { useState } from "react";
import { VerificationBadge } from "@/components/shared/status-badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DescriptionList } from "@/components/ui/description-list";
import { Field } from "@/components/ui/field";
import { Textarea } from "@/components/ui/input";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useReviewTechnician } from "@/hooks/use-technicians";
import { formatDate, toIsoString } from "@/lib/utils";
import type { Technician } from "@/types";

interface TechnicianReviewDrawerProps {
  technician: Technician | null;
  onClose: () => void;
}

function ReviewBody({ technician, onClose }: { technician: Technician; onClose: () => void }) {
  const review = useReviewTechnician(onClose);
  const [reason, setReason] = useState("");
  const decide = (decision: "verified" | "rejected") => review.mutate({ id: technician.id, decision, reason: reason.trim() || undefined });
  return (
    <div className="space-y-7">
      <header className="flex items-center gap-4">
        <Avatar name={technician.name} src={technician.avatarUrl} size="lg" />
        <div className="space-y-1">
          <p className="font-semibold">{technician.name}</p>
          <VerificationBadge status={technician.verificationStatus} />
        </div>
      </header>
      <DescriptionList items={[
        { label: "Email", value: technician.email },
        { label: "Phone", value: technician.phone },
        { label: "Location", value: `${technician.location.area}, ${technician.location.city}` },
        { label: "Experience", value: `${technician.yearsExperience} years` },
        { label: "Skills", value: <span className="whitespace-normal">{technician.skills.join(", ")}</span> },
        { label: "Joined", value: <time dateTime={toIsoString(technician.createdAt)}>{formatDate(technician.createdAt)}</time> },
      ]} />
      <section aria-labelledby="docs-heading" className="space-y-3">
        <h3 id="docs-heading" className="text-sm font-semibold">Uploaded documents</h3>
        <ul className="grid gap-3 sm:grid-cols-2">
          {technician.documents.map((document) => (
            <li key={document.id}>
              <figure className="overflow-hidden rounded-xl border border-border">
                <div className="flex aspect-[4/3] items-center justify-center bg-[linear-gradient(135deg,var(--muted),var(--accent))]">
                  <FileText className="size-10 text-primary/70" aria-hidden="true" />
                </div>
                <figcaption className="space-y-0.5 border-t border-border px-3 py-2">
                  <span className="block truncate text-xs font-medium">{document.name}</span>
                  <span className="block text-[11px] text-muted-foreground">{document.kind === "certificate" ? "Certificate" : "Government ID"}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>
      <Field id="reject-reason" label="Reason (shown to the technician if rejected)" optional>
        <Textarea id="reject-reason" value={reason} onChange={(event) => setReason(event.target.value)} className="min-h-20" placeholder="Certificate number could not be verified." />
      </Field>
      <footer className="grid grid-cols-2 gap-3">
        <Button variant="danger-outline" size="lg" onClick={() => decide("rejected")} loading={review.isPending && review.variables?.decision === "rejected"}>Reject</Button>
        <Button size="lg" onClick={() => decide("verified")} loading={review.isPending && review.variables?.decision === "verified"}>Approve</Button>
      </footer>
    </div>
  );
}

export function TechnicianReviewDrawer({ technician, onClose }: TechnicianReviewDrawerProps) {
  return (
    <Sheet open={Boolean(technician)} onOpenChange={(open) => !open && onClose()}>
      <SheetContent title="Review technician" description="Check documents before approving.">
        {technician ? <ReviewBody technician={technician} onClose={onClose} /> : null}
      </SheetContent>
    </Sheet>
  );
}
