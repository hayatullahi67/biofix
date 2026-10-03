"use client";

import { useId } from "react";
import { NativeSelect } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterSelectProps {
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}

export function FilterSelect({ label, value, options, onChange }: FilterSelectProps) {
  const id = useId();
  return (
    <div className="min-w-0 sm:w-44">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <NativeSelect id={id} value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </NativeSelect>
    </div>
  );
}

export function FilterBar({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div role="group" aria-label="Filters" className={cn("grid auto-cols-fr grid-flow-col gap-2 sm:flex sm:flex-wrap sm:items-center", className)}>
      {children}
    </div>
  );
}
