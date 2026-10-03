import { absoluteUrl, siteConfig } from "@/lib/seo";
import { JsonLd } from "./json-ld";

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
        logo: absoluteUrl("/icons/icon-512.png"),
        description: siteConfig.description,
        slogan: siteConfig.tagline,
        areaServed: { "@type": "Country", name: "Nigeria" },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: siteConfig.email,
          telephone: siteConfig.phone,
          areaServed: "NG",
          availableLanguage: ["English"],
        },
      }}
    />
  );
}
