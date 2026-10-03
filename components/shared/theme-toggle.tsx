"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

const options = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

const subscribe = () => () => undefined;

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  return (
    <div role="radiogroup" aria-label="Colour theme" className={cn("flex items-center gap-1 rounded-lg border border-border bg-muted/60 p-0.5", className)}>
      {options.map((option) => {
        const active = mounted && theme === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={`${option.label} theme`}
            onClick={() => setTheme(option.value)}
            className={cn(
              "flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors",
              active ? "bg-card text-foreground shadow-[var(--shadow-soft)]" : "hover:text-foreground",
            )}
          >
            <option.icon className="size-3.5" aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}
