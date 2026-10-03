"use client";

import { X } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;

interface SheetContentProps extends React.ComponentProps<typeof DialogPrimitive.Content> {
  title: string;
  description?: string;
  side?: "right" | "left";
}

export function SheetContent({ title, description, side = "right", className, children, ...props }: SheetContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-[2px] data-[state=open]:animate-[fade-in_180ms_ease-out]" />
      <DialogPrimitive.Content
        className={cn(
          "fixed inset-y-0 z-50 flex w-full flex-col border-border bg-background shadow-[var(--shadow-lift)] outline-none sm:max-w-xl",
          side === "right"
            ? "right-0 border-l data-[state=open]:animate-[slide-in-right_260ms_cubic-bezier(0.16,1,0.3,1)]"
            : "left-0 border-r data-[state=open]:animate-[slide-in-left_260ms_cubic-bezier(0.16,1,0.3,1)]",
          className,
        )}
        {...props}
      >
        <aside className="flex h-full flex-col" aria-label={title}>
          <header className="glass sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
            <div className="min-w-0 space-y-1">
              <DialogPrimitive.Title className="truncate text-base font-semibold tracking-tight">{title}</DialogPrimitive.Title>
              {description ? <DialogPrimitive.Description className="text-sm text-muted-foreground">{description}</DialogPrimitive.Description> : null}
            </div>
            <DialogPrimitive.Close className="-mr-1 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" aria-label="Close panel">
              <X className="size-4" aria-hidden="true" />
            </DialogPrimitive.Close>
          </header>
          <div className="flex-1 overflow-y-auto px-5 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-6">{children}</div>
        </aside>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
