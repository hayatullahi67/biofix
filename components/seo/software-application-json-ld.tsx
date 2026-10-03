import type { PricingPlan } from "@/types/content";
import { siteConfig } from "@/lib/seo";
import { JsonLd } from "./json-ld";

interface SoftwareApplicationJsonLdProps {
  plans: PricingPlan[];
}

export function SoftwareApplicationJsonLd({ plans }: SoftwareApplicationJsonLdProps) {
  return (
    <JsonLd
      data={{
        "@type": "SoftwareApplication",
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        offers: plans.map((plan) => ({
          "@type": "Offer",
          name: plan.name,
          price: String(plan.priceNaira),
          priceCurrency: "NGN",
          description: plan.description,
        })),
      }}
    />
  );
}
