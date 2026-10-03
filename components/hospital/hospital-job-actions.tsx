"use client";

import { CircleCheck, Loader2, Send } from "lucide-react";
import { useState } from "react";
import { PostJobDialog } from "@/components/shared/post-job-dialog";
import { QuoteSummary } from "@/components/shared/quote-summary";
import { StarRating } from "@/components/ui/star-rating";
import { Button } from "@/components/ui/button";
import { useApproveQuote, useConfirmJob } from "@/hooks/use-job-actions";
import { paymentMethodLabels } from "@/lib/domain/job-flow";
import { formatNaira } from "@/lib/utils";
import type { JobDetails } from "@/types";
import { ApplicantsList } from "./applicants-list";
import { RecordPayment } from "./record-payment";
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
  const [posting, setPosting] = useState(false);
  const approve = useApproveQuote();
  const confirm = useConfirmJob();

  switch (job.status) {
    case "reported":
      return (
        <div className="space-y-2">
          <Button size="lg" className="w-full" onClick={() => setPosting(true)}>
            <Send aria-hidden="true" />
            Post job to technicians
          </Button>
          <p className="text-center text-xs text-muted-foreground">Add how technicians can reach you. They&apos;ll apply or contact you.</p>
          <PostJobDialog jobId={job.id} machineName={job.machine.name} open={posting} onOpenChange={setPosting} />
        </div>
      );
    case "open":
      return <ApplicantsList job={job} />;
    case "accepted":
      return <Notice spinning>The technician is on the way to your hospital.</Notice>;
    case "arrived":
      return <Notice spinning>The technician is inspecting the machine and preparing a quote.</Notice>;
    case "quoted":
      return job.quote ? (
        <div className="space-y-4">
          <QuoteSummary quote={job.quote} />
          <Button size="lg" className="w-full" onClick={() => approve.mutate(job.id)} loading={approve.isPending}>
            <CircleCheck aria-hidden="true" />
            Approve quote
          </Button>
          <p className="text-center text-xs text-muted-foreground">You&apos;ll pay the technician directly once the repair is confirmed.</p>
        </div>
      ) : null;
    case "approved":
      return <Notice spinning>Quote approved. The technician is carrying out the repair.</Notice>;
    case "fixed":
      return (
        <div className="space-y-4">
          {job.fixReport ? <p className="rounded-xl bg-accent/60 p-4 text-sm"><strong className="font-semibold">Technician notes: </strong>{job.fixReport.notes}</p> : null}
          <Button size="lg" className="w-full" onClick={() => confirm.mutate(job.id)} loading={confirm.isPending}>
            <CircleCheck aria-hidden="true" />
            Confirm machine is fixed
          </Button>
        </div>
      );
    case "confirmed":
      return <RecordPayment job={job} />;
    case "paid":
      return (
        <div className="space-y-4">
          <Notice>
            Paid {formatNaira(job.payment?.amount ?? job.quote?.total ?? job.estimatedPay)} directly{job.payment ? ` by ${paymentMethodLabels[job.payment.method].toLowerCase()}` : ""}.
          </Notice>
          {job.rating ? (
            <Notice><span className="flex items-center gap-2">You rated this repair <StarRating value={job.rating} /></span></Notice>
          ) : job.technician ? (
            <RateTechnician jobId={job.id} technicianName={job.technician.name} />
          ) : null}
        </div>
      );
    case "disputed":
      return <Notice>This job is under review by the Biofix team. We&apos;ll contact you within 24 hours.</Notice>;
  }
}
