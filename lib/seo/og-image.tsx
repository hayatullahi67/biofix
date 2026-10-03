import { ImageResponse } from "next/og";
import { siteConfig } from "./site-config";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageAlt = `${siteConfig.name}: ${siteConfig.tagline}`;

export function renderOgImage(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "linear-gradient(135deg, #0F766E 0%, #115E59 55%, #134E4A 100%)",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: 24,
              background: "rgba(255,255,255,0.14)",
              border: "2px solid rgba(255,255,255,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="60" height="60" viewBox="0 0 64 64">
              <path
                d="M12 34 H22 L27 21 L35 45 L40 31 H52"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div style={{ fontSize: 56, fontWeight: 700, letterSpacing: -1 }}>{siteConfig.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05 }}>
            {siteConfig.tagline}
          </div>
          <div style={{ fontSize: 32, color: "rgba(255,255,255,0.82)", maxWidth: 900 }}>
            Medical equipment maintenance for hospitals in Nigeria.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "rgba(255,255,255,0.7)" }}>biofix.ng</div>
      </div>
    ),
    ogImageSize,
  );
}
