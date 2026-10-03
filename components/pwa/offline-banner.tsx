"use client";

import { WifiOff } from "lucide-react";
import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

export function OfflineBanner() {
  const online = useSyncExternalStore(subscribe, () => navigator.onLine, () => true);
  if (online) return null;
  return (
    <div role="status" aria-live="polite" className="fixed inset-x-0 top-0 z-[70] flex justify-center px-4 pt-[max(0.5rem,env(safe-area-inset-top))]">
      <p className="flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background shadow-[var(--shadow-lift)]">
        <WifiOff className="size-4" aria-hidden="true" />
        You&apos;re offline. Changes will sync when you reconnect.
      </p>
    </div>
  );
}
