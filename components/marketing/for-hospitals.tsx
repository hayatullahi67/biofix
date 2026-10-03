import Link from "next/link";
import { ArrowRight, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hospitalBenefits } from "@/lib/content/landing";
import { BenefitList } from "./benefit-list";
import { MarketingSection } from "./marketing-section";
import { Reveal } from "./reveal";

export function ForHospitals() {
  return (
    <MarketingSection
      id="for-hospitals"
      eyebrow="For hospitals"
      title="Hospital equipment management software your whole team will use"
      intro="Give admins a live view of every machine and give nurses a one-minute way to report faults. NHIA accreditation equipment records come built in."
      align="left"
      className="border-y border-border bg-card/40"
    >
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <BenefitList items={hospitalBenefits} />
        <Reveal>
          <aside aria-label="Example QR sticker workflow" className="rounded-3xl border border-border bg-gradient-to-br from-accent to-card p-8 shadow-[var(--shadow-soft)]">
            <QrCode className="size-10 text-primary" aria-hidden="true" />
            <p className="mt-6 font-display text-3xl leading-tight">&ldquo;Our ICU ventilator was back in service the same afternoon. Before Biofix it took a week just to find someone.&rdquo;</p>
            <p className="mt-6 text-sm text-muted-foreground">Medical Director, private hospital in Ikeja, Lagos</p>
            <Button asChild className="mt-8">
              <Link href="/signup?type=hospital">
                Register your hospital
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </aside>
        </Reveal>
      </div>
    </MarketingSection>
  );
}
