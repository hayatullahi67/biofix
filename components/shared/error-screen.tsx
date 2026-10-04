"use client";

import Link from "next/link";
import { House, RefreshCw, RotateCcw, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { reloadOnceForStaleAssets, resetDemoData } from "@/lib/utils/recovery";

interface ErrorScreenProps {
  error?: Error & { digest?: string };
  retry?: () => void;
  homeHref?: string;
  fullPage?: boolean;
}

export function ErrorScreen({ error, retry, homeHref = "/", fullPage = false }: ErrorScreenProps) {
  const [resetting, setResetting] = useState(false);

  useEffect(() => {
    if (error) reloadOnceForStaleAssets(error);
  }, [error]);

  return (
    <section aria-labelledby="error-heading" className={fullPage ? "flex min-h-dvh items-center justify-center bg-background px-4 py-16" : "flex min-h-[60dvh] items-center justify-center px-4 py-12"}>
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-accent">
          <TriangleAlert className="size-8 text-warning" aria-hidden="true" />
        </div>
        <div className="space-y-2">
          <h1 id="error-heading" className="font-display text-4xl text-foreground">Something went wrong</h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            This page hit a problem while loading. Try again, or head back to your dashboard. If it keeps happening, resetting the demo data usually fixes it.
          </p>
          {error?.digest ? <p className="font-mono text-xs text-muted-foreground">Reference: {error.digest}</p> : null}
        </div>
        <div className="flex flex-col justify-center gap-2 sm:flex-row">
          <Button onClick={() => (retry ? retry() : window.location.reload())}>
            <RefreshCw aria-hidden="true" />
            Try again
          </Button>
          <Button asChild variant="outline">
            <Link href={homeHref}>
              <House aria-hidden="true" />
              Go to dashboard
            </Link>
          </Button>
        </div>
        <Button
          variant="link"
          size="sm"
          loading={resetting}
          onClick={() => {
            setResetting(true);
            void resetDemoData();
          }}
        >
          {!resetting ? <RotateCcw aria-hidden="true" /> : null}
          Reset demo data and log in again
        </Button>
      </div>
    </section>
  );
}
