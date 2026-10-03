"use client";

import { PageHeader } from "@/components/shared/page-header";
import { useCurrentUser } from "@/hooks/use-session";
import { BrokenMachinesList } from "./broken-machines-list";
import { MyReportsList } from "./my-reports-list";
import { ReportActions } from "./report-actions";

export function NurseHome() {
  const user = useCurrentUser();
  return (
    <div className="space-y-8">
      <PageHeader eyebrow={user.ward ? `${user.ward} ward` : "Nurse"} title={`Hi, ${user.name.split(" ")[0]}`} description="Spotted a broken machine? Report it here and we'll get it fixed." />
      <ReportActions />
      <BrokenMachinesList />
      <MyReportsList />
    </div>
  );
}
