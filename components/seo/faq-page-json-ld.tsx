import type { FaqItem } from "@/types/content";
import { JsonLd } from "./json-ld";

interface FAQPageJsonLdProps {
  items: FaqItem[];
}

export function FAQPageJsonLd({ items }: FAQPageJsonLdProps) {
  return (
    <JsonLd
      data={{
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }}
    />
  );
}
