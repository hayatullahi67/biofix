"use client";

import Image from "next/image";
import { Check, ChevronsUpDown } from "lucide-react";
import { useId, useMemo, useState } from "react";
import { inputClasses } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Machine } from "@/types";

interface MachineComboboxProps {
  id: string;
  machines: Machine[];
  value: string;
  onChange: (machineId: string) => void;
  invalid?: boolean;
  describedBy?: string;
}

export function MachineCombobox({ id, machines, value, onChange, invalid, describedBy }: MachineComboboxProps) {
  const listId = useId();
  const selected = machines.find((machine) => machine.id === value);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    return machines.filter((machine) => !term || `${machine.name} ${machine.ward} ${machine.code} ${machine.type}`.toLowerCase().includes(term)).slice(0, 8);
  }, [machines, query]);

  const choose = (machine: Machine) => {
    onChange(machine.id);
    setQuery("");
    setOpen(false);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") { event.preventDefault(); setOpen(true); setActive((index) => Math.min(index + 1, results.length - 1)); }
    else if (event.key === "ArrowUp") { event.preventDefault(); setActive((index) => Math.max(index - 1, 0)); }
    else if (event.key === "Enter" && open && results[active]) { event.preventDefault(); choose(results[active]); }
    else if (event.key === "Escape") setOpen(false);
  };

  return (
    <div className="relative">
      <input
        id={id}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={open && results[active] ? `${listId}-${results[active].id}` : undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        autoComplete="off"
        className={cn(inputClasses, "pr-10")}
        placeholder={selected ? `${selected.name} · ${selected.ward}` : "Search by machine name, ward or code"}
        value={open ? query : selected ? `${selected.name} · ${selected.ward}` : query}
        onChange={(event) => { setQuery(event.target.value); setOpen(true); setActive(0); }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        onKeyDown={onKeyDown}
      />
      <ChevronsUpDown className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
      <ul id={listId} role="listbox" aria-label="Machines" hidden={!open} className="absolute z-30 mt-2 max-h-80 w-full overflow-y-auto rounded-xl border border-border bg-popover p-1.5 shadow-[var(--shadow-lift)]">
        {results.length === 0 ? <li className="px-3 py-6 text-center text-sm text-muted-foreground">No machines match &ldquo;{query}&rdquo;</li> : null}
        {results.map((machine, index) => (
          <li
            key={machine.id}
            id={`${listId}-${machine.id}`}
            role="option"
            aria-selected={machine.id === value}
            onMouseDown={(event) => { event.preventDefault(); choose(machine); }}
            onMouseEnter={() => setActive(index)}
            className={cn("flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2", index === active && "bg-muted")}
          >
            <span className="relative size-9 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
              <Image src={machine.photoUrl} alt="" fill sizes="36px" className="object-cover" unoptimized={machine.photoUrl.startsWith("data:")} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium">{machine.name}</span>
              <span className="block truncate text-xs text-muted-foreground">{machine.ward} · {machine.code}</span>
            </span>
            {machine.id === value ? <Check className="size-4 text-primary" aria-hidden="true" /> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
