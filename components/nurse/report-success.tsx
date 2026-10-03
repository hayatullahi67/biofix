"use client";

import Link from "next/link";
import { CircleCheck } from "lucide-react";
import { JobTimeline } from "@/components/shared/job-timeline";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { CreatedReport, Machine } from "@/types";

export function ReportSuccess({ created, machine, onReset }: { created: CreatedReport; machine: Machine; onReset: () => void }) {
  return (
    <div className="mx-auto max-w-lg space-y-6">
      <Card as="section" aria-labelledby="success-heading" className="space-y-4 p-6 text-center sm:p-8">
        <span className="mx-auto flex size-14 animate-[rise_400ms_ease-out] items-center justify-center rounded-full bg-success-soft text-success">
          <CircleCheck className="size-7" aria-hidden="true" />
        </span>
        <h1 id="success-heading" className="text-2xl font-semibold tracking-tight">Report sent</h1>
        <p className="text-sm text-muted-foreground">
          Your admin has been notified about <strong className="text-foreground">{machine.name}</strong> in {machine.ward}.
        </p>
        <p className="inline-flex rounded-lg bg-muted px-3 py-1.5 font-mono text-sm">Report ID: {created.report.id}</p>
      </Card>
      <Card as="section" aria-labelledby="status-heading" className="p-6">
        <h2 id="status-heading" className="mb-5 text-base font-semibold">What happens next</h2>
        <JobTimeline job={created.job} />
      </Card>
      <div className="grid gap-3 sm:grid-cols-2">
        <Button variant="outline" size="lg" onClick={onReset}>Report another</Button>
        <Button asChild size="lg"><Link href="/nurse">Back to home</Link></Button>
      </div>
    </div>
  );
}
