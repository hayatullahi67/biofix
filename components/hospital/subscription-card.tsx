"use client";

import { Check, Sparkles } from "lucide-react";
import { QueryState } from "@/components/shared/query-state";
import { SectionCard } from "@/components/shared/section-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useChangePlan, useMyHospital } from "@/hooks/use-hospitals";
import { pricingPlans } from "@/lib/content/pricing";
import { formatNaira } from "@/lib/utils";

export function SubscriptionCard() {
  const query = useMyHospital();
  const change = useChangePlan();
  return (
    <SectionCard id="plan-heading" title="Subscription plan">
      <QueryState query={query} loading={<Skeleton className="h-48 rounded-xl" />}>
        {(hospital) => {
          const plan = pricingPlans.find((candidate) => candidate.id === hospital.plan) ?? pricingPlans[0];
          const premium = hospital.plan === "premium";
          return (
            <article aria-label={`${plan.name} plan`} className="space-y-5 rounded-xl bg-gradient-to-br from-accent to-card p-5 ring-1 ring-primary/15">
              <header className="flex items-start justify-between gap-3">
                <div>
                  <p className="flex items-center gap-2 text-lg font-semibold">
                    {premium ? <Sparkles className="size-4 text-primary" aria-hidden="true" /> : null}
                    Biofix {plan.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{plan.priceNaira ? `${formatNaira(plan.priceNaira)} ${plan.period}` : "Free forever"}</p>
                </div>
                <Badge tone={hospital.status === "trial" ? "warning" : "success"} dot>{hospital.status === "trial" ? "Trial" : "Active"}</Badge>
              </header>
              <ul className="space-y-2 text-sm">
                {plan.features.slice(0, 4).map((feature) => (
                  <li key={feature} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />{feature}</li>
                ))}
              </ul>
              <Button variant={premium ? "outline" : "primary"} className="w-full" loading={change.isPending} onClick={() => change.mutate(premium ? "free" : "premium")}>
                {premium ? "Switch to Free" : "Upgrade to Premium"}
              </Button>
            </article>
          );
        }}
      </QueryState>
    </SectionCard>
  );
}
