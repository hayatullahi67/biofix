import { InstallPrompt } from "@/components/pwa/install-prompt";
import { OfflineBanner } from "@/components/pwa/offline-banner";
import { ServiceWorkerUpdater } from "@/components/pwa/service-worker-updater";
import { Toaster } from "@/components/ui/toaster";
import { QueryProvider } from "./query-provider";
import { StoreHydrator } from "./store-hydrator";
import { ThemeProvider } from "./theme-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <StoreHydrator />
        {children}
        <Toaster />
        <OfflineBanner />
        <InstallPrompt />
        <ServiceWorkerUpdater />
      </QueryProvider>
    </ThemeProvider>
  );
}
