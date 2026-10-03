import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { DashboardMockup } from "./dashboard-mockup";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28">
      <div className="bg-grid absolute inset-0 -z-20 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" aria-hidden="true" />
      <div className="absolute top-[-12rem] left-1/2 -z-10 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--primary)_28%,transparent),transparent)] opacity-70 blur-3xl" aria-hidden="true" />
      <div className="mx-auto max-w-4xl animate-[rise_500ms_cubic-bezier(0.16,1,0.3,1)_both] text-center">
        <p className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-[var(--shadow-soft)]">
          <ShieldCheck className="size-3.5 text-primary" aria-hidden="true" />
          Verified biomedical technicians in Lagos and Abuja
        </p>
        <Heading level={1} id="hero-heading" size="display" className="font-normal">
          Keep every machine <em className="text-primary">working.</em>
        </Heading>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Biofix is medical equipment maintenance software for hospitals in Nigeria. Track every machine, let nurses report faults with a QR scan, and get them fixed by verified biomedical technicians, fast.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/signup">
              Create your hospital account
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
            <Link href="/login">Explore the live demo</Link>
          </Button>
        </div>
      </div>
      <div className="mt-16 animate-[rise_700ms_120ms_cubic-bezier(0.16,1,0.3,1)_both] sm:mt-20">
        <DashboardMockup />
      </div>
    </section>
  );
}
