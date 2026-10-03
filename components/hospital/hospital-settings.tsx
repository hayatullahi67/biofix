import { PageHeader } from "@/components/shared/page-header";
import { BillingHistory } from "./billing-history";
import { HospitalProfileForm } from "./hospital-profile-form";
import { MaintenanceReportCard } from "./maintenance-report-card";
import { SubscriptionCard } from "./subscription-card";

export function HospitalSettings() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Settings" title="Reports and settings" description="Download reports, update your hospital profile and manage your plan." />
      <MaintenanceReportCard />
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <HospitalProfileForm />
        <SubscriptionCard />
      </div>
      <BillingHistory />
    </div>
  );
}
