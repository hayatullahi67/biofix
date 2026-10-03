"use client";

import { CircleCheck, Loader2, Search } from "lucide-react";
import { useState } from "react";
import { QuoteSummary } from "@/components/shared/quote-summary";
import { StarRating } from "@/components/ui/star-rating";
import { Button } from "@/components/ui/button";
import { useApproveQuote, useConfirmJob, useFindTechnician } from "@/hooks/use-job-actions";
import { useCurrentUser } from "@/hooks/use-session";
import type { JobDetails } from "@/types";
import { PaystackDialog } from "./paystack-dialog";
import { RateTechnician } from "./rate-technician";

function Notice({ children, spinning = false }: { children: React.ReactNode; spinning?: boolean }) {
  return (
    <p className="flex items-center gap-2.5 rounded-xl border border-border bg-muted/50 p-4 text-sm text-muted-foreground">
      {spinning ? <Loader2 className="size-4 animate-spin text-primary" aria-hidden="true" /> : <CircleCheck className="size-4 text-success" aria-hidden="true" />}
      {children}
    </p>
  );
}

export function HospitalJobActions({ job }: { job: JobDetails }) {
  const user = useCurrentUser();
  const [payOpen, setPayOpen] = useState(false);
  const find = useFindTechnician();
  const approve = useApproveQuote();
  const confirm = useConfirmJob();

  switch (job.status) {
    case "reported":
      return (
        <Button size="lg" className="w-full" onClick={() => find.mutate(job.id)} loading={find.isPending}>
          <Search aria-hidden="true" />
          Find technician
        </Button>
      );
    case "open":
      return <Notice spinning>Posted to verified technicians nearby. You&apos;ll be notified when one accepts.</Notice>;
    case "accepted":
      return <Notice spinning>The technician is on the way to your hospital.</Notice>;
    case "arrived":
      return <Notice spinning>The technician is inspecting the machine and preparing a quote.</Notice>;
    case "quoted":
      return job.quote ? (
        <div className="space-y-4">
          <QuoteSummary quote={job.quote} />
          <Button size="lg" className="w-full" onClick={() => setPayOpen(true)}>Approve and pay</Button>
          <PaystackDialog open={payOpen} onOpenChange={setPayOpen} amount={job.quote.total} email={user.email} loading={approve.isPending} onPay={() => approve.mutate(job.id, { onSuccess: () => setPayOpen(false) })} />
        </div>
      ) : null;
    case "approved":
      return <Notice spinning>Payment is in escrow. The technician is carrying out the repair.</Notice>;
    case "fixed":
      return (
        <div className="space-y-4">
          {job.fixReport ? <p className="rounded-xl bg-accent/60 p-4 text-sm"><strong className="font-semibold">Technician notes: </strong>{job.fixReport.notes}</p> : null}
          <Button size="lg" className="w-full" onClick={() => confirm.mutate(job.id)} loading={confirm.isPending}>
            <CircleCheck aria-hidden="true" />
            Confirm fixed and release payment
          </Button>
        </div>
      );
    case "confirmed":
    case "paid":
      if (job.rating) return <Notice><span className="flex items-center gap-2">You rated this repair <StarRating value={job.rating} /></span></Notice>;
      return job.technician ? <RateTechnician jobId={job.id} technicianName={job.technician.name} /> : null;
    case "disputed":
      return <Notice>This job is under review by the Biofix team. We&apos;ll contact you within 24 hours.</Notice>;
  }
}
