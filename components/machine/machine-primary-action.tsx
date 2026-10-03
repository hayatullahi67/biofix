"use client";

import Link from "next/link";
import { Briefcase, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useActiveJobForMachine } from "@/hooks/use-jobs";
import { useCurrentUser } from "@/hooks/use-session";
import type { Machine } from "@/types";
import { AdminReportDialog } from "./admin-report-dialog";

function TechnicianAction({ machine }: { machine: Machine }) {
  const user = useCurrentUser();
  const job = useActiveJobForMachine(machine.id);
  const visible = job.data && (job.data.status === "open" || job.data.technicianId === user.id);
  if (job.isPending) return <Button size="lg" className="h-14 w-full" loading>Checking for jobs</Button>;
  if (!visible) return <p className="rounded-xl bg-muted p-4 text-center text-sm text-muted-foreground">There is no open repair job for this machine.</p>;
  return (
    <Button asChild size="lg" className="h-14 w-full text-base">
      <Link href={`/tech/jobs/${job.data?.id}`}>
        <Briefcase aria-hidden="true" />
        View job
      </Link>
    </Button>
  );
}

export function MachinePrimaryAction({ machine }: { machine: Machine }) {
  const user = useCurrentUser();
  const [reportOpen, setReportOpen] = useState(false);
  if (user.role === "technician") return <TechnicianAction machine={machine} />;
  if (user.role === "super_admin") return null;
  if (user.hospitalId !== machine.hospitalId) {
    return <p className="rounded-xl bg-muted p-4 text-center text-sm text-muted-foreground">This machine belongs to another hospital.</p>;
  }
  if (user.role === "nurse") {
    return (
      <Button asChild size="lg" variant="danger" className="h-14 w-full text-base">
        <Link href={`/nurse/report?machine=${machine.code}`}>
          <TriangleAlert aria-hidden="true" />
          Report fault
        </Link>
      </Button>
    );
  }
  return (
    <>
      <Button size="lg" variant="danger" className="h-14 w-full text-base" onClick={() => setReportOpen(true)}>
        <TriangleAlert aria-hidden="true" />
        Report fault
      </Button>
      <AdminReportDialog machine={machine} open={reportOpen} onOpenChange={setReportOpen} />
    </>
  );
}
