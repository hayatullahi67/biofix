import { PageHeader } from "@/components/shared/page-header";
import { HospitalProfileForm } from "./hospital-profile-form";
import { MaintenanceReportCard } from "./maintenance-report-card";

export function HospitalSettings() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Settings" title="Reports and settings" description="Download maintenance reports and keep your hospital profile up to date." />
      <MaintenanceReportCard />
      <HospitalProfileForm />
    </div>
  );
}
