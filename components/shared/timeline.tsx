import { cn, formatDateTime, toIsoString } from "@/lib/utils";

export type TimelineTone = "primary" | "success" | "warning" | "danger" | "info" | "muted";

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  at?: string;
  actor?: string;
  tone?: TimelineTone;
}

const dotTones: Record<TimelineTone, string> = {
  primary: "bg-primary ring-primary/20",
  success: "bg-success ring-success/20",
  warning: "bg-warning ring-warning/20",
  danger: "bg-danger ring-danger/20",
  info: "bg-info ring-info/20",
  muted: "bg-muted-foreground/40 ring-transparent",
};

interface TimelineProps {
  items: TimelineItem[];
  label: string;
  className?: string;
}

export function Timeline({ items, label, className }: TimelineProps) {
  return (
    <ol aria-label={label} className={cn("relative space-y-5", className)}>
      {items.map((item, index) => (
        <li key={item.id} className="relative flex gap-4 pl-0.5">
          {index < items.length - 1 ? <span className="absolute top-4 left-[7px] h-[calc(100%+0.5rem)] w-px bg-border" aria-hidden="true" /> : null}
          <span className={cn("relative mt-1 size-3.5 shrink-0 rounded-full ring-4", dotTones[item.tone ?? "primary"])} aria-hidden="true" />
          <div className="min-w-0 flex-1 space-y-0.5">
            <p className={cn("text-sm font-medium", item.tone === "muted" ? "text-muted-foreground" : "text-foreground")}>{item.title}</p>
            {item.description ? <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p> : null}
            {item.at || item.actor ? (
              <p className="text-xs text-muted-foreground">
                {item.at ? <time dateTime={toIsoString(item.at)}>{formatDateTime(item.at)}</time> : null}
                {item.at && item.actor ? " · " : null}
                {item.actor}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
