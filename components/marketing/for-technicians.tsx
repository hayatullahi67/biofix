import Link from "next/link";
import { ArrowRight, MapPin, Star, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { technicianBenefits } from "@/lib/content/landing";
import { BenefitList } from "./benefit-list";
import { MarketingSection } from "./marketing-section";
import { Reveal } from "./reveal";

const highlights = [
  { icon: MapPin, label: "3.2 km away", detail: "Patient monitor, Ikeja" },
  { icon: Wallet, label: "₦95,000", detail: "Paid on confirmation" },
  { icon: Star, label: "4.8 rating", detail: "142 jobs completed" },
];

export function ForTechnicians() {
  return (
    <MarketingSection
      id="for-technicians"
      eyebrow="For technicians"
      title="More repair jobs for every biomedical technician in Lagos and Abuja"
      intro="Get verified once, then find hospital equipment repair jobs near you, send quotes from your phone and get paid straight to your bank."
      align="left"
    >
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="order-last lg:order-first">
          <ul className="space-y-3">
            {highlights.map((item) => (
              <li key={item.label} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
                <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-primary">
                  <item.icon className="size-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-lg font-semibold tabular-nums">{item.label}</span>
                  <span className="block text-sm text-muted-foreground">{item.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
        <div className="space-y-8">
          <BenefitList items={technicianBenefits} />
          <Button asChild variant="outline">
            <Link href="/signup?type=technician">
              Apply as a technician
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </MarketingSection>
  );
}
