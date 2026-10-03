"use client";

import { cn } from "@/lib/utils";

interface SegmentedOption<T extends string> {
  value: T;
  label: string;
  tone?: "neutral" | "warning" | "danger";
}

interface SegmentedControlProps<T extends string> {
  name: string;
  legend: string;
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

const activeTone = {
  neutral: "peer-checked:bg-card peer-checked:text-foreground",
  warning: "peer-checked:bg-warning-soft peer-checked:text-warning",
  danger: "peer-checked:bg-danger-soft peer-checked:text-danger",
};

export function SegmentedControl<T extends string>({ name, legend, options, value, onChange, className }: SegmentedControlProps<T>) {
  return (
    <fieldset className={cn("space-y-2", className)}>
      <legend className="mb-2 text-sm font-medium">{legend}</legend>
      <div className="grid gap-1 rounded-xl border border-border bg-muted/70 p-1" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
        {options.map((option) => (
          <label key={option.value} className="relative cursor-pointer">
            <input type="radio" name={name} value={option.value} checked={value === option.value} onChange={() => onChange(option.value)} className="peer sr-only" />
            <span
              className={cn(
                "flex h-10 items-center justify-center rounded-lg text-sm font-medium text-muted-foreground transition-all duration-200 peer-checked:shadow-[var(--shadow-soft)] peer-focus-visible:ring-2 peer-focus-visible:ring-ring",
                activeTone[option.tone ?? "neutral"],
              )}
            >
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
