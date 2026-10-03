export interface FaqItem {
  question: string;
  answer: string;
}

export interface PricingPlan {
  id: "free";
  name: string;
  priceNaira: number;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}
