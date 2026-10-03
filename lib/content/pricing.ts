import type { PricingPlan } from "@/types/content";

export const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    priceNaira: 0,
    period: "for every hospital and technician",
    description: "Everything in Biofix is free while we grow across Nigeria.",
    features: [
      "Unlimited machines and QR stickers",
      "Unlimited nurses and fault reports",
      "Post repair jobs to verified technicians",
      "In-app messaging with technicians",
      "Preventive maintenance reminders",
      "NHIA-ready maintenance reports",
    ],
    cta: "Create your free account",
    highlighted: true,
  },
];
