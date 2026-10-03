import Image from "next/image";
import { DescriptionList } from "@/components/ui/description-list";
import { formatDateTime, toIsoString } from "@/lib/utils";
import type { JobDetails } from "@/types";
import { UrgencyBadge } from "./status-badge";

export function JobFaultDetails({ job }: { job: JobDetails }) {
  const { report } = job;
  return (
    <div className="space-y-4">
      {report.photos.length > 0 ? (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {report.photos.map((photo, index) => (
            <li key={`${index}-${photo.slice(-10)}`}>
              <figure className="overflow-hidden rounded-xl border border-border bg-muted">
                <div className="relative aspect-[4/3]">
                  <Image src={photo} alt={`Fault photo ${index + 1} of ${job.machine.name}`} fill sizes="200px" className="object-cover" unoptimized={photo.startsWith("data:")} />
                </div>
                <figcaption className="px-2.5 py-1.5 text-[11px] text-muted-foreground">Photo {index + 1}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      ) : null}
      <p className="rounded-xl bg-muted/60 p-4 text-sm leading-relaxed">{report.description}</p>
      <DescriptionList
        items={[
          { label: "What's wrong", value: report.category },
          { label: "Urgency", value: <UrgencyBadge urgency={report.urgency} /> },
          { label: "Reported by", value: job.reporter?.name ?? "Hospital admin" },
          { label: "Reported", value: <time dateTime={toIsoString(report.createdAt)}>{formatDateTime(report.createdAt)}</time> },
          { label: "Machine", value: job.machine.name },
          { label: "Ward", value: job.machine.ward },
        ]}
      />
    </div>
  );
}
