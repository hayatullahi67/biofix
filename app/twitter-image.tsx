import { ogImageAlt, renderOgImage } from "@/lib/seo/og-image";

export const alt = ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return renderOgImage();
}
