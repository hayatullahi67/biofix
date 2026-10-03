"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChipGroupProps<T extends string> {
  legend: string;
  name: string;
  options: readonly T[];
  value: T[];
  onChange: (value: T[]) => void;
  multiple?: boolean;
  error?: string;
  className?: string;
}

export function ChipGroup<T extends string>({ legend, name, options, value, onChange, multiple = false, error, className }: ChipGroupProps<T>) {
  const toggle = (option: T) => {
    if (!multiple) return onChange([option]);
    onChange(value.includes(option) ? value.filter((item) => item !== option) : [...value, option]);
  };

  return (
    <fieldset className={cn("space-y-2", className)} aria-invalid={error ? true : undefined}>
      <legend className="mb-2 text-sm font-medium">{legend}</legend>
      <ul className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = value.includes(option);
          return (
            <li key={option}>
              <label className="cursor-pointer">
                <input type={multiple ? "checkbox" : "radio"} name={name} checked={selected} onChange={() => toggle(option)} className="peer sr-only" />
                <span
                  className={cn(
                    "inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-sm transition-all duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-ring",
                    selected ? "border-primary bg-accent font-medium text-accent-foreground" : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
                  )}
                >
                  {selected ? <Check className="size-3.5" aria-hidden="true" /> : null}
                  {option}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
      {error ? <p role="alert" className="text-xs font-medium text-danger">{error}</p> : null}
    </fieldset>
  );
}
