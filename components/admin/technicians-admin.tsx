"use client";

import { ShieldCheck } from "lucide-react";
import { useState } from "react";
import { DataTable, type Column } from "@/components/shared/data-table";
import { PageHeader } from "@/components/shared/page-header";
import { VerificationBadge } from "@/components/shared/status-badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { StarRating } from "@/components/ui/star-rating";
import { TabCount, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTechnicians } from "@/hooks/use-technicians";
import { verificationMeta } from "@/lib/domain/status-meta";
import type { Technician, VerificationStatus } from "@/types";
import { TechnicianReviewDrawer } from "./technician-review-drawer";

const statuses: VerificationStatus[] = ["pending", "verified", "rejected"];

export function TechniciansAdmin() {
  const query = useTechnicians();
  const [reviewing, setReviewing] = useState<Technician | null>(null);
  const columns: Column<Technician>[] = [
    { key: "name", header: "Technician", cell: (tech) => <span className="flex items-center gap-3"><Avatar name={tech.name} src={tech.avatarUrl} size="sm" /><span><span className="block font-medium">{tech.name}</span><span className="block text-xs text-muted-foreground">{tech.email}</span></span></span> },
    { key: "location", header: "Location", cell: (tech) => `${tech.location.area}, ${tech.location.city}` },
    { key: "skills", header: "Skills", cell: (tech) => <span className="text-muted-foreground">{tech.skills.slice(0, 2).join(", ")}{tech.skills.length > 2 ? ` +${tech.skills.length - 2}` : ""}</span> },
    { key: "rating", header: "Rating", cell: (tech) => (tech.rating ? <StarRating value={tech.rating} /> : <span className="text-muted-foreground">—</span>) },
    { key: "status", header: "Status", cell: (tech) => <VerificationBadge status={tech.verificationStatus} /> },
    { key: "action", header: "Action", headerClassName: "sr-only", className: "text-right", cell: (tech) => <Button variant="outline" size="sm" onClick={() => setReviewing(tech)}>Review<span className="sr-only"> {tech.name}</span></Button> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Technicians" title="Technician verification" description="Approve technicians after checking their certificate and ID." />
      <Tabs defaultValue="pending">
        <TabsList aria-label="Filter technicians by verification status">
          {statuses.map((status) => (
            <TabsTrigger key={status} value={status}>
              {verificationMeta[status].label}
              <TabCount value={query.data?.filter((tech) => tech.verificationStatus === status).length} />
            </TabsTrigger>
          ))}
        </TabsList>
        {statuses.map((status) => (
          <TabsContent key={status} value={status}>
            <DataTable
              caption={`${verificationMeta[status].label} technicians`}
              columns={columns}
              query={query}
              filter={(rows) => rows.filter((tech) => tech.verificationStatus === status)}
              getRowKey={(tech) => tech.id}
              empty={<EmptyState icon={ShieldCheck} title="Nothing here" description={status === "pending" ? "No technicians are waiting for review." : "No technicians in this list yet."} />}
            />
          </TabsContent>
        ))}
      </Tabs>
      <TechnicianReviewDrawer technician={reviewing} onClose={() => setReviewing(null)} />
    </div>
  );
}
