import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
  tone?: "neutral" | "danger";
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, action, tone = "neutral", className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-card/50 px-6 py-12 text-center", className)}>
      <span
        className={cn(
          "relative flex size-14 items-center justify-center rounded-2xl border shadow-[var(--shadow-soft)]",
          tone === "danger" ? "border-danger/20 bg-danger-soft text-danger" : "border-border bg-card text-primary",
        )}
      >
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <div className="max-w-sm space-y-1.5">
        <p className="text-base font-semibold text-foreground">{title}</p>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  );
}
