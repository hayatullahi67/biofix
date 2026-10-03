import type { Metadata, Viewport } from "next";
import { AppProviders } from "@/components/providers/app-providers";
import { fontVariables } from "@/lib/fonts";
import { siteConfig } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Biofix | Medical Equipment Maintenance for Hospitals in Nigeria",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: "Biofix", url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  applicationName: siteConfig.name,
  category: "health",
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name}: ${siteConfig.tagline}`,
    description: siteConfig.description,
    locale: siteConfig.locale,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: `${siteConfig.name}: ${siteConfig.tagline}` }],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: `${siteConfig.name}: ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: [
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
  appleWebApp: { capable: true, title: siteConfig.name, statusBarStyle: "default" },
  formatDetection: { telephone: false, email: false, address: false },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: siteConfig.backgroundColor },
    { media: "(prefers-color-scheme: dark)", color: "#070B14" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body className="min-h-dvh font-sans antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
