import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main-content" className="flex min-h-dvh items-center justify-center bg-background px-4 py-16">
      <section aria-labelledby="not-found-heading" className="w-full max-w-md space-y-6 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-accent">
          <Compass className="size-8 text-primary" aria-hidden="true" />
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">404</p>
          <h1 id="not-found-heading" className="font-display text-4xl text-foreground">We couldn&apos;t find that page</h1>
          <p className="text-sm leading-relaxed text-muted-foreground">The link may be broken, or the page may have moved. Check the address, or head back to Biofix.</p>
        </div>
        <div className="flex flex-col justify-center gap-2 sm:flex-row">
          <Button asChild>
            <Link href="/">
              <ArrowLeft aria-hidden="true" />
              Back to home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/login">Log in to your dashboard</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
