import { Faq } from "@/components/marketing/faq";
import { FinalCta } from "@/components/marketing/final-cta";
import { ForHospitals } from "@/components/marketing/for-hospitals";
import { ForTechnicians } from "@/components/marketing/for-technicians";
import { Hero } from "@/components/marketing/hero";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { Pricing } from "@/components/marketing/pricing";
import { Problem } from "@/components/marketing/problem";
import { FAQPageJsonLd, OrganizationJsonLd, SoftwareApplicationJsonLd, WebSiteJsonLd } from "@/components/seo";
import { faqItems } from "@/lib/content/faq";
import { pricingPlans } from "@/lib/content/pricing";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Biofix | Medical Equipment Maintenance for Hospitals in Nigeria",
  description:
    "Track hospital equipment, report faults with a QR scan and hire verified biomedical technicians in Lagos and Abuja. NHIA-ready maintenance records. Start free.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />
      <WebSiteJsonLd />
      <SoftwareApplicationJsonLd plans={pricingPlans} />
      <FAQPageJsonLd items={faqItems} />
      <Hero />
      <Problem />
      <HowItWorks />
      <ForHospitals />
      <ForTechnicians />
      <Pricing plans={pricingPlans} />
      <Faq items={faqItems} />
      <FinalCta />
    </>
  );
}
