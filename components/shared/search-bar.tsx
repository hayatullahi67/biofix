"use client";

import { Search, X } from "lucide-react";
import { useId } from "react";
import { inputClasses } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ value, onChange, label, placeholder, className }: SearchBarProps) {
  const id = useId();
  return (
    <search className={cn("relative w-full sm:max-w-xs", className)}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
      <input
        id={id}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder ?? label}
        className={cn(inputClasses, "pl-10 pr-9 [&::-webkit-search-cancel-button]:hidden")}
      />
      {value ? (
        <button type="button" onClick={() => onChange("")} className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:text-foreground" aria-label="Clear search">
          <X className="size-4" aria-hidden="true" />
        </button>
      ) : null}
    </search>
  );
}
