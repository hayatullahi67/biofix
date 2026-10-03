"use client";

import { Download, X } from "lucide-react";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { useUiStore } from "@/lib/stores/ui-store";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPrompt() {
  const [event, setEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const dismissed = useUiStore((state) => state.installDismissed);
  const dismiss = useUiStore((state) => state.dismissInstall);

  useEffect(() => {
    const onPrompt = (incoming: Event) => {
      incoming.preventDefault();
      setEvent(incoming as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  if (!event || dismissed) return null;

  const install = async () => {
    await event.prompt();
    await event.userChoice;
    setEvent(null);
    dismiss();
  };

  return (
    <aside aria-label="Install Biofix" className="fixed inset-x-3 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-50 animate-[rise_300ms_ease-out] md:hidden">
      <div className="flex items-center gap-3 rounded-2xl border border-border bg-popover p-3 shadow-[var(--shadow-lift)]">
        <LogoMark className="size-10 shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">Install Biofix</p>
          <p className="text-xs text-muted-foreground">Report faults faster from your home screen.</p>
        </div>
        <Button size="sm" onClick={() => void install()}>
          <Download aria-hidden="true" />
          Install
        </Button>
        <button type="button" onClick={dismiss} className="rounded-md p-1 text-muted-foreground hover:text-foreground" aria-label="Dismiss install prompt">
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}
