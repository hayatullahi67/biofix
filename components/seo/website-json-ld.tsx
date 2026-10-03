import { siteConfig } from "@/lib/seo";
import { JsonLd } from "./json-ld";

export function WebSiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        inLanguage: "en-NG",
      }}
    />
  );
}
