"use client";

import { ErrorScreen } from "@/components/shared/error-screen";

export default function RootError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <main id="main-content">
      <ErrorScreen error={error} retry={retry} homeHref="/login" fullPage />
    </main>
  );
}
