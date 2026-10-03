import { Activity, CircleCheck, TriangleAlert, Wrench } from "lucide-react";

const stats = [
  { label: "Machines", value: "128", icon: Activity, tone: "text-primary bg-accent" },
  { label: "Working", value: "117", icon: CircleCheck, tone: "text-success bg-success-soft" },
  { label: "Due service", value: "7", icon: Wrench, tone: "text-warning bg-warning-soft" },
  { label: "Broken", value: "4", icon: TriangleAlert, tone: "text-danger bg-danger-soft" },
];

const jobs = [
  { machine: "ICU Ventilator 1", ward: "ICU", status: "Technician on site", tone: "bg-info" },
  { machine: "Digital X-ray Unit", ward: "Radiology", status: "Quote received", tone: "bg-warning" },
  { machine: "Neonatal Incubator 2", ward: "NICU", status: "Fixed, confirm", tone: "bg-success" },
];

const bars = [38, 52, 30, 64, 46, 24];

export function DashboardMockup() {
  return (
    <figure className="relative mx-auto w-full max-w-5xl">
      <div className="absolute -inset-x-10 -top-10 -bottom-6 -z-10 rounded-[3rem] bg-[radial-gradient(60%_60%_at_50%_30%,color-mix(in_oklab,var(--primary)_22%,transparent),transparent)] blur-2xl" aria-hidden="true" />
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_30px_80px_-30px_rgb(15_23_42/0.35)] ring-1 ring-black/5" aria-hidden="true">
        <div className="flex items-center gap-1.5 border-b border-border bg-muted/50 px-4 py-3">
          <span className="size-2.5 rounded-full bg-rose-400" />
          <span className="size-2.5 rounded-full bg-amber-400" />
          <span className="size-2.5 rounded-full bg-emerald-400" />
          <span className="ml-3 rounded-md bg-card px-3 py-0.5 text-[11px] text-muted-foreground">biofix.ng/hospital</span>
        </div>
        <div className="grid gap-4 p-4 sm:p-6">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-border p-3 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">{stat.label}</span>
                  <span className={`flex size-6 items-center justify-center rounded-lg ${stat.tone}`}><stat.icon className="size-3.5" /></span>
                </div>
                <p className="mt-2 text-xl font-semibold tabular-nums">{stat.value}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-3 md:grid-cols-[1.2fr_1fr]">
            <div className="rounded-xl border border-border p-4 text-left">
              <p className="text-xs font-medium">Faults per month</p>
              <div className="mt-4 flex h-28 items-end gap-3">
                {bars.map((height, index) => (
                  <span key={index} className="flex-1 rounded-t-[4px] bg-primary/80" style={{ height: `${height + 30}%` }} />
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-border p-4 text-left">
              <p className="text-xs font-medium">Open jobs</p>
              <ul className="mt-3 space-y-2.5">
                {jobs.map((job) => (
                  <li key={job.machine} className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="truncate"><span className="font-medium">{job.machine}</span> <span className="text-muted-foreground">· {job.ward}</span></span>
                    <span className="flex shrink-0 items-center gap-1.5 text-muted-foreground"><span className={`size-1.5 rounded-full ${job.tone}`} />{job.status}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-4 text-center text-sm text-muted-foreground">
        The Biofix hospital dashboard: live equipment status, faults per month and open repair jobs.
      </figcaption>
    </figure>
  );
}
