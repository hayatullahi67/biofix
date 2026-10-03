import { Plus } from "lucide-react";
import type { FaqItem } from "@/types/content";
import { MarketingSection } from "./marketing-section";

export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <MarketingSection id="faq" eyebrow="FAQ" title="Questions about hospital equipment maintenance with Biofix">
      <ul className="mx-auto max-w-3xl space-y-3">
        {items.map((item) => (
          <li key={item.question}>
            <article>
              <details className="group rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)] transition-shadow open:shadow-[var(--shadow-lift)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-6 py-5 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-base font-medium">{item.question}</h3>
                  <Plus className="size-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-45" aria-hidden="true" />
                </summary>
                <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
              </details>
            </article>
          </li>
        ))}
      </ul>
    </MarketingSection>
  );
}
