"use client";

import { ErrorScreen } from "@/components/shared/error-screen";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

export default function GlobalError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="min-h-dvh font-sans antialiased">
        <title>Something went wrong | Biofix</title>
        <main id="main-content">
          <ErrorScreen error={error} retry={retry} homeHref="/login" fullPage />
        </main>
      </body>
    </html>
  );
}
