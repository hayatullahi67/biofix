"use client";

import { Building2 } from "lucide-react";
import { useState } from "react";
import { DataTable, type Column } from "@/components/shared/data-table";
import { PageHeader } from "@/components/shared/page-header";
import { SearchBar } from "@/components/shared/search-bar";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { useHospitals } from "@/hooks/use-hospitals";
import { formatDate, toIsoString } from "@/lib/utils";
import type { HospitalSummary } from "@/types";

const statusTone = { active: "success", new: "info", suspended: "danger" } as const;

const columns: Column<HospitalSummary>[] = [
  { key: "name", header: "Hospital", cell: (hospital) => <span><span className="block font-medium">{hospital.name}</span><span className="block text-xs text-muted-foreground">{hospital.email}</span></span> },
  { key: "location", header: "Location", cell: (hospital) => <address className="not-italic">{hospital.area}, {hospital.city}</address> },
  { key: "machines", header: "Machines", className: "tabular-nums", cell: (hospital) => hospital.machinesCount },
  { key: "open", header: "Open jobs", className: "tabular-nums", cell: (hospital) => hospital.openJobsCount },
  { key: "status", header: "Status", cell: (hospital) => <Badge tone={statusTone[hospital.status]} dot>{hospital.status[0]?.toUpperCase() + hospital.status.slice(1)}</Badge> },
  { key: "joined", header: "Joined", cell: (hospital) => <time dateTime={toIsoString(hospital.createdAt)} className="text-muted-foreground">{formatDate(hospital.createdAt)}</time> },
];

export function HospitalsAdmin() {
  const query = useHospitals();
  const [search, setSearch] = useState("");
  const term = search.trim().toLowerCase();
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Hospitals" title="Hospitals" description="Every hospital using Biofix and the equipment they track." />
      <SearchBar value={search} onChange={setSearch} label="Search hospitals" placeholder="Search by name or city" />
      <DataTable
        caption="Hospitals on Biofix"
        columns={columns}
        query={query}
        filter={(rows) => rows.filter((hospital) => !term || `${hospital.name} ${hospital.city} ${hospital.area}`.toLowerCase().includes(term))}
        getRowKey={(hospital) => hospital.id}
        empty={<EmptyState icon={Building2} title="No hospitals found" description="Try a different search." />}
      />
    </div>
  );
}
