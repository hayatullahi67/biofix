import { Check } from "lucide-react";
import { hasReached } from "@/lib/domain/job-flow";
import { cn } from "@/lib/utils";
import type { JobStatus } from "@/types";

const steps: { status: JobStatus; label: string }[] = [
  { status: "accepted", label: "Assigned" },
  { status: "arrived", label: "Arrive" },
  { status: "quoted", label: "Quote" },
  { status: "approved", label: "Approved" },
  { status: "fixed", label: "Fix" },
  { status: "paid", label: "Paid" },
];

export function JobProgress({ status }: { status: JobStatus }) {
  const currentIndex = steps.findIndex((step) => !hasReached(status, step.status));
  return (
    <ol aria-label="Job progress" className="grid grid-cols-6 gap-1.5">
      {steps.map((step, index) => {
        const done = hasReached(status, step.status);
        const current = index === currentIndex;
        return (
          <li key={step.status} className="space-y-1.5" aria-current={current ? "step" : undefined}>
            <span className={cn("block h-1.5 rounded-full transition-colors duration-300", done ? "bg-primary" : current ? "bg-primary/35" : "bg-muted")} aria-hidden="true" />
            <span className={cn("flex items-center gap-1 text-[11px] font-medium", done ? "text-foreground" : "text-muted-foreground")}>
              {done ? <Check className="size-3 text-primary" aria-hidden="true" /> : null}
              {step.label}
              <span className="sr-only">{done ? " (done)" : current ? " (current)" : ""}</span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
