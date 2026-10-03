import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "./site-config";

interface BuildMetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
  absoluteTitle?: boolean;
}

export function buildMetadata({
  title,
  description,
  path,
  image = siteConfig.ogImage,
  noIndex = false,
  absoluteTitle = false,
}: BuildMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  const images = [{ url: image, width: 1200, height: 630, alt: `${siteConfig.name}: ${siteConfig.tagline}` }];

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      locale: siteConfig.locale,
      images,
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      title: fullTitle,
      description,
      images: [image],
    },
    robots: noIndex ? privateRobots : { index: true, follow: true },
  };
}

export const privateRobots: Metadata["robots"] = {
  index: false,
  follow: false,
  googleBot: { index: false, follow: false },
};

export const privateMetadata: Metadata = { robots: privateRobots };
