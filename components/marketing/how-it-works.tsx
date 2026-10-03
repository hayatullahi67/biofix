import { howItWorksSteps } from "@/lib/content/landing";
import { MarketingSection } from "./marketing-section";
import { Reveal } from "./reveal";

export function HowItWorks() {
  return (
    <MarketingSection
      id="how-it-works"
      eyebrow="How it works"
      title="From broken machine to verified repair in four steps"
      intro="Biofix turns hospital equipment maintenance into a simple, trackable workflow that nurses, admins and technicians all share."
    >
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {howItWorksSteps.map((step, index) => (
          <li key={step.title}>
            <Reveal delay={index * 0.06} className="h-full">
              <article className="relative h-full rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
                <span className="mb-5 flex size-9 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground" aria-hidden="true">
                  {index + 1}
                </span>
                <h3 className="text-base font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </MarketingSection>
  );
}
