import type { PricingPlan } from "@/types/content";

export const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    priceNaira: 0,
    period: "forever",
    description: "For clinics getting their equipment records in order.",
    features: ["Up to 15 machines", "QR stickers for every machine", "Unlimited fault reports", "Hire verified technicians", "2 nurse accounts"],
    cta: "Start for free",
    highlighted: false,
  },
  {
    id: "premium",
    name: "Premium",
    priceNaira: 25000,
    period: "per month",
    description: "For hospitals that need every machine working, every day.",
    features: [
      "Unlimited machines and nurses",
      "Preventive maintenance reminders",
      "NHIA-ready maintenance reports",
      "Priority technician matching",
      "Escrow payments with Paystack",
      "Dedicated account manager",
    ],
    cta: "Start 14-day trial",
    highlighted: true,
  },
];
