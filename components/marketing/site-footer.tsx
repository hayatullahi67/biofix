import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { publicRoutes, siteConfig } from "@/lib/seo";

const productLinks = [
  { href: "/#how-it-works", label: "How Biofix works" },
  { href: "/#pricing", label: "Pricing for hospitals" },
  { href: "/#faq", label: "Frequently asked questions" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Medical equipment maintenance for hospitals in Nigeria. {siteConfig.tagline}
          </p>
        </div>
        <nav aria-label="Product links">
          <h2 className="mb-3 text-sm font-semibold">Product</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {productLinks.map((link) => (
              <li key={link.href}><Link href={link.href} className="hover:text-foreground">{link.label}</Link></li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Account links">
          <h2 className="mb-3 text-sm font-semibold">Account</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {publicRoutes.filter((route) => route.path !== "/").map((route) => (
              <li key={route.path}><Link href={route.path} className="hover:text-foreground">{route.label}</Link></li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="mb-3 text-sm font-semibold">Contact</h2>
          <address className="space-y-2 text-sm not-italic text-muted-foreground">
            <p>14 Allen Avenue, Ikeja, Lagos, Nigeria</p>
            <p><a href={`mailto:${siteConfig.email}`} className="hover:text-foreground">{siteConfig.email}</a></p>
            <p><a href={`tel:${siteConfig.phone.replace(/-/g, "")}`} className="hover:text-foreground">{siteConfig.phone}</a></p>
          </address>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} Biofix Technologies Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
