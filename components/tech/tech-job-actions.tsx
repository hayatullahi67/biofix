"use client";

import { CircleCheck, Hourglass, ShieldAlert } from "lucide-react";
import { QuoteSummary } from "@/components/shared/quote-summary";
import { Button } from "@/components/ui/button";
import { useAcceptJob } from "@/hooks/use-job-actions";
import { useCurrentUser } from "@/hooks/use-session";
import { useMyTechnicianProfile } from "@/hooks/use-technicians";
import { formatNaira } from "@/lib/utils";
import type { JobDetails } from "@/types";
import { ArriveAction } from "./arrive-action";
import { FixReportForm } from "./fix-report-form";
import { QuoteForm } from "./quote-form";

function Waiting({ children, done = false }: { children: React.ReactNode; done?: boolean }) {
  const Icon = done ? CircleCheck : Hourglass;
  return (
    <p className="flex items-center gap-3 rounded-xl border border-border bg-muted/50 p-4 text-sm">
      <Icon className={done ? "size-5 text-success" : "size-5 animate-pulse text-warning"} aria-hidden="true" />
      {children}
    </p>
  );
}

export function TechJobActions({ job }: { job: JobDetails }) {
  const user = useCurrentUser();
  const profile = useMyTechnicianProfile();
  const accept = useAcceptJob();
  const mine = job.technicianId === user.id;

  if (job.status === "open") {
    if (profile.data && profile.data.verificationStatus !== "verified") {
      return <p className="flex gap-3 rounded-xl bg-warning-soft p-4 text-sm"><ShieldAlert className="size-5 shrink-0 text-warning" aria-hidden="true" />Only verified technicians can accept jobs. Complete verification on your profile.</p>;
    }
    return (
      <Button size="lg" className="w-full" onClick={() => accept.mutate(job.id)} loading={accept.isPending || profile.isPending}>
        Accept job · {formatNaira(job.estimatedPay)}
      </Button>
    );
  }
  if (!mine) return <Waiting>Another technician has taken this job.</Waiting>;

  switch (job.status) {
    case "accepted":
      return <ArriveAction jobId={job.id} hospitalName={job.hospital.name} />;
    case "arrived":
      return <QuoteForm jobId={job.id} />;
    case "quoted":
      return (
        <div className="space-y-4">
          <Waiting>Quote sent. Waiting for the hospital to approve it.</Waiting>
          {job.quote ? <QuoteSummary quote={job.quote} /> : null}
        </div>
      );
    case "approved":
      return <FixReportForm jobId={job.id} />;
    case "fixed":
      return <Waiting>Waiting for the hospital to confirm the repair.</Waiting>;
    case "confirmed":
      return <Waiting>Repair confirmed. Collect {formatNaira(job.quote?.total ?? job.estimatedPay)} directly from the hospital by cash or bank transfer.</Waiting>;
    case "paid":
      return <Waiting done>The hospital recorded paying you {formatNaira(job.payment?.amount ?? job.quote?.total ?? job.estimatedPay)}{job.payment ? ` by ${job.payment.method === "cash" ? "cash" : "bank transfer"}` : ""}.</Waiting>;
    case "disputed":
      return <Waiting>The hospital opened a dispute. The Biofix team will contact you.</Waiting>;
    default:
      return null;
  }
}
