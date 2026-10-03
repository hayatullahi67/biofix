import { problemStats } from "@/lib/content/landing";
import { MarketingSection } from "./marketing-section";
import { Reveal } from "./reveal";

export function Problem() {
  return (
    <MarketingSection
      id="problem"
      eyebrow="The problem"
      title="Hospital equipment repair in Nigeria is slow, costly and invisible"
      intro="Broken ventilators, idle X-ray rooms and dialysis sessions cancelled because no one knows who can fix a machine, or when it was last serviced."
      className="border-y border-border bg-card/40"
    >
      <ul className="grid gap-4 md:grid-cols-3">
        {problemStats.map((stat, index) => (
          <li key={stat.value}>
            <Reveal delay={index * 0.06} className="h-full">
              <article className="h-full rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-soft)]">
                <p className="font-display text-5xl text-primary">{stat.value}</p>
                <h3 className="mt-3 text-sm leading-relaxed font-normal text-muted-foreground">{stat.label}</h3>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </MarketingSection>
  );
}
