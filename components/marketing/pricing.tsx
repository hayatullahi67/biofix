import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatNaira, cn } from "@/lib/utils";
import type { PricingPlan } from "@/types/content";
import { MarketingSection } from "./marketing-section";

function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <article
      aria-labelledby={`plan-${plan.id}`}
      className={cn(
        "relative flex h-full flex-col rounded-3xl border bg-card p-8 shadow-[var(--shadow-soft)]",
        plan.highlighted ? "border-primary/40 shadow-[var(--shadow-lift)] ring-1 ring-primary/20" : "border-border",
      )}
    >
      <header>
        <h3 id={`plan-${plan.id}`} className="text-lg font-semibold">{plan.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
        <p className="mt-6 flex items-baseline gap-2">
          <span className="text-4xl font-semibold tracking-tight tabular-nums">{plan.priceNaira === 0 ? "₦0" : formatNaira(plan.priceNaira)}</span>
          <span className="text-sm text-muted-foreground">{plan.period}</span>
        </p>
      </header>
      <ul className="my-8 flex-1 space-y-3 text-sm">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-3">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>
      <footer>
        <Button asChild variant={plan.highlighted ? "primary" : "outline"} className="w-full" size="lg">
          <Link href="/signup">{plan.cta}</Link>
        </Button>
      </footer>
    </article>
  );
}

export function Pricing({ plans }: { plans: PricingPlan[] }) {
  return (
    <MarketingSection
      id="pricing"
      eyebrow="Pricing"
      title="Medical equipment maintenance software, free for every hospital"
      intro="No subscriptions and no fees. Hospitals pay technicians directly for repairs, and everything else in Biofix is free."
      className="border-y border-border bg-card/40"
    >
      <ul className="mx-auto grid max-w-md gap-6">
        {plans.map((plan) => (
          <li key={plan.id}>
            <PricingCard plan={plan} />
          </li>
        ))}
      </ul>
    </MarketingSection>
  );
}
