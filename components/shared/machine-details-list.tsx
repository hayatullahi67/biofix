import { DescriptionList } from "@/components/ui/description-list";
import { formatDate, toIsoString } from "@/lib/utils";
import type { Machine } from "@/types";

function DateValue({ value }: { value: string }) {
  return <time dateTime={toIsoString(value)}>{formatDate(value)}</time>;
}

export function MachineDetailsList({ machine, compact = false }: { machine: Machine; compact?: boolean }) {
  const core = [
    { label: "Ward", value: machine.ward },
    { label: "Last service", value: <DateValue value={machine.lastServiceDate} /> },
    { label: "Next service", value: <DateValue value={machine.nextServiceDate} /> },
    { label: "Machine code", value: <span className="font-mono">{machine.code}</span> },
  ];
  const full = [
    { label: "Type", value: machine.type },
    { label: "Brand", value: machine.brand },
    { label: "Model", value: machine.model },
    { label: "Serial number", value: <span className="font-mono">{machine.serialNumber}</span> },
    { label: "Purchased", value: <DateValue value={machine.purchaseDate} /> },
    { label: "Warranty ends", value: <DateValue value={machine.warrantyEnd} /> },
    { label: "Service interval", value: `Every ${machine.serviceIntervalMonths} months` },
  ];
  return <DescriptionList items={compact ? core : [...core, ...full]} columns={2} />;
}
