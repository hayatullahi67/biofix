import Link from "next/link";
import { Menu } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#for-hospitals", label: "For hospitals" },
  { href: "/#for-technicians", label: "For technicians" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

export function SiteHeader() {
  return (
    <header className="glass sticky top-0 z-40 border-b border-border/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Logo />
        <nav aria-label="Main navigation" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/signup">Get started</Link>
          </Button>
          <details className="group relative lg:hidden">
            <summary className="flex size-9 cursor-pointer list-none items-center justify-center rounded-lg border border-border bg-card [&::-webkit-details-marker]:hidden" aria-label="Open menu">
              <Menu className="size-4" aria-hidden="true" />
            </summary>
            <nav aria-label="Mobile menu" className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-popover p-2 shadow-[var(--shadow-lift)]">
              <ul>
                {[...links, { href: "/login", label: "Log in" }].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="block rounded-lg px-3 py-2.5 text-sm hover:bg-muted">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
