"use client";

import { MonitorCog, Plus, Printer } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDeferredValue, useState } from "react";
import { DataTable } from "@/components/shared/data-table";
import { FilterBar, FilterSelect } from "@/components/shared/filter-bar";
import { MachineCard } from "@/components/shared/machine-card";
import { PageHeader } from "@/components/shared/page-header";
import { SearchBar } from "@/components/shared/search-bar";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { useMachines, useWards } from "@/hooks/use-machines";
import { machineStatusMeta } from "@/lib/domain/status-meta";
import { machineTypes, type MachineFilters, type MachineStatus } from "@/types";
import { AddMachineDialog } from "./add-machine-dialog";
import { equipmentColumns } from "./equipment-columns";
import { PrintStickersDialog } from "./print-stickers-dialog";

const statusOptions = [{ value: "all", label: "All statuses" }, ...(Object.keys(machineStatusMeta) as MachineStatus[]).map((status) => ({ value: status, label: machineStatusMeta[status].label }))];
const typeOptions = [{ value: "all", label: "All types" }, ...machineTypes.map((type) => ({ value: type, label: type }))];

export function EquipmentList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Omit<MachineFilters, "search">>({ status: "all", ward: "all", type: "all" });
  const [printOpen, setPrintOpen] = useState(false);
  const deferredSearch = useDeferredValue(search);
  const query = useMachines({ ...filters, search: deferredSearch });
  const wards = useWards();
  const addOpen = searchParams.get("add") === "1";
  const setAddOpen = (open: boolean) => router.replace(open ? `${pathname}?add=1` : pathname, { scroll: false });
  const wardOptions = [{ value: "all", label: "All wards" }, ...(wards.data ?? []).map((ward) => ({ value: ward, label: ward }))];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Equipment"
        title="Equipment register"
        description="Every machine in your hospital, its status and when it's next due for service."
        actions={
          <>
            <Button variant="outline" onClick={() => setPrintOpen(true)} disabled={!query.data?.length}>
              <Printer aria-hidden="true" />
              Print all stickers
            </Button>
            <Button onClick={() => setAddOpen(true)}>
              <Plus aria-hidden="true" />
              Add machine
            </Button>
          </>
        }
      />
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <SearchBar value={search} onChange={setSearch} label="Search machines" placeholder="Search name, code or serial" />
        <FilterBar>
          <FilterSelect label="Filter by status" value={filters.status ?? "all"} options={statusOptions} onChange={(status) => setFilters({ ...filters, status: status as MachineFilters["status"] })} />
          <FilterSelect label="Filter by ward" value={filters.ward ?? "all"} options={wardOptions} onChange={(ward) => setFilters({ ...filters, ward })} />
          <FilterSelect label="Filter by type" value={filters.type ?? "all"} options={typeOptions} onChange={(type) => setFilters({ ...filters, type: type as MachineFilters["type"] })} />
        </FilterBar>
      </div>
      <DataTable
        caption="Hospital equipment"
        columns={equipmentColumns}
        query={query}
        getRowKey={(machine) => machine.id}
        mobileCard={(machine) => <MachineCard machine={machine} href={`/hospital/equipment/${machine.id}`} />}
        empty={<EmptyState icon={MonitorCog} title="No machines found" description="Try a different search or filter, or add a new machine to your register." action={<Button variant="outline" onClick={() => setAddOpen(true)}>Add machine</Button>} />}
      />
      <AddMachineDialog open={addOpen} onOpenChange={setAddOpen} />
      <PrintStickersDialog open={printOpen} onOpenChange={setPrintOpen} machines={query.data ?? []} title="Print all stickers" />
    </div>
  );
}
