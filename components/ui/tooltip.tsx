"use client";

import { Tooltip as TooltipPrimitive } from "radix-ui";

interface TooltipProps {
  label: string;
  side?: "top" | "right" | "bottom" | "left";
  disabled?: boolean;
  children: React.ReactNode;
}

export function Tooltip({ label, side = "right", disabled = false, children }: TooltipProps) {
  if (disabled) return <>{children}</>;
  return (
    <TooltipPrimitive.Provider delayDuration={150}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content side={side} sideOffset={8} className="z-50 rounded-lg bg-foreground px-2.5 py-1.5 text-xs font-medium text-background shadow-[var(--shadow-lift)]">
            {label}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
