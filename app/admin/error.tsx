"use client";

import { ErrorScreen } from "@/components/shared/error-screen";

export default function SectionError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return <ErrorScreen error={error} retry={retry} homeHref="/admin" />;
}
