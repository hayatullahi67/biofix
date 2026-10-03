import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-heading" className="px-4 pb-24 sm:px-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-teal-700 via-teal-800 to-teal-950 px-6 py-16 text-center text-white shadow-[var(--shadow-lift)] sm:px-12 sm:py-20">
        <div className="bg-grid absolute inset-0 opacity-20 [mask-image:radial-gradient(60%_80%_at_50%_0%,black,transparent)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-2xl space-y-6">
          <h2 id="final-cta-heading" className="font-display text-4xl leading-tight sm:text-5xl">
            Start tracking your hospital equipment today
          </h2>
          <p className="text-base text-teal-50/85 sm:text-lg">
            Set up in 10 minutes. Print your QR stickers this afternoon. Never lose track of a broken machine again.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-white text-teal-900 hover:bg-teal-50">
              <Link href="/signup">
                Create a free account
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-white hover:bg-white/10">
              <Link href="/login">Try the demo accounts</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
