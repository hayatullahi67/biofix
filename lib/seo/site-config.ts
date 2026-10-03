export interface PublicRoute {
  path: string;
  label: string;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
}

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://biofix.ng";

export const siteConfig = {
  name: "Biofix",
  tagline: "Keep every machine working.",
  description:
    "Biofix is hospital equipment management software for Nigeria. Track medical equipment, report faults and hire verified biomedical technicians in minutes.",
  url: rawSiteUrl.replace(/\/$/, ""),
  ogImage: "/opengraph-image",
  twitterHandle: "@biofixng",
  locale: "en_NG",
  themeColor: "#0F766E",
  backgroundColor: "#FAFAF9",
  email: "hello@biofix.ng",
  phone: "+234-800-000-0000",
  keywords: [
    "medical equipment maintenance Nigeria",
    "hospital equipment management software",
    "biomedical technician Lagos",
    "hospital equipment repair",
    "NHIA accreditation equipment records",
    "biomedical engineering Nigeria",
    "medical equipment tracking",
  ],
} as const;

export const publicRoutes: PublicRoute[] = [
  { path: "/", label: "Home", changeFrequency: "weekly", priority: 1 },
  { path: "/signup", label: "Create account", changeFrequency: "monthly", priority: 0.8 },
  { path: "/login", label: "Log in", changeFrequency: "yearly", priority: 0.5 },
];

export const privateRoutePrefixes = ["/hospital/", "/nurse/", "/tech/", "/admin/", "/m/", "/join/", "/api/"];

export function absoluteUrl(path = "/"): string {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
