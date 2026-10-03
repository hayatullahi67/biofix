import Image from "next/image";
import Link from "next/link";
import { Building2, CalendarClock, Images, Navigation, UserRound } from "lucide-react";
import { Card } from "@/components/ui/card";
import { formatDateTime, formatDistanceKm, formatNaira, formatRelative, toIsoString } from "@/lib/utils";
import type { JobDetails } from "@/types";
import { JobStatusBadge, UrgencyBadge } from "./status-badge";

interface JobCardProps {
  job: JobDetails;
  href: string;
  showStatus?: boolean;
  headingLevel?: 2 | 3;
}

export function JobCard({ job, href, showStatus = false, headingLevel = 3 }: JobCardProps) {
  const HeadingTag = `h${headingLevel}` as const;
  const pay = job.quote?.total ?? job.estimatedPay;
  const photo = job.report.photos[0] ?? job.machine.photoUrl;
  const postedAt = job.postedAt ?? job.createdAt;
  const postedBy = job.poster?.name ?? job.reporter?.name;
  return (
    <Card as="article" interactive className="relative flex flex-col gap-4 overflow-hidden p-5">
      <figure className="relative -mx-5 -mt-5 aspect-[16/9] bg-muted">
        <Image src={photo} alt={`Fault photo of ${job.machine.name}: ${job.report.category}`} fill sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw" className="object-cover" unoptimized={photo.startsWith("data:")} />
        {job.report.photos.length > 1 ? (
          <figcaption className="absolute right-3 bottom-3 flex items-center gap-1 rounded-full bg-slate-950/70 px-2 py-0.5 text-[11px] font-medium text-white">
            <Images className="size-3" aria-hidden="true" />
            {job.report.photos.length} photos
          </figcaption>
        ) : null}
      </figure>
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <p className="truncate text-xs font-medium text-primary">{job.machine.type} · {job.report.category}</p>
          <HeadingTag className="line-clamp-1 text-base font-semibold tracking-tight">
            <Link href={href} scroll={!href.includes("?")} className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none">
              {job.machine.name}
            </Link>
          </HeadingTag>
        </div>
        {showStatus ? <JobStatusBadge status={job.status} /> : <UrgencyBadge urgency={job.report.urgency} />}
      </header>
      <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{job.report.description}</p>
      <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
        <li className="flex items-center gap-1.5">
          <Building2 className="size-3.5" aria-hidden="true" />
          {job.hospital.name}, {job.hospital.area}
        </li>
        {job.distanceKm !== undefined ? (
          <li className="flex items-center gap-1.5">
            <Navigation className="size-3.5" aria-hidden="true" />
            {formatDistanceKm(job.distanceKm)}
          </li>
        ) : null}
        <li className="flex items-center gap-1.5">
          <CalendarClock className="size-3.5" aria-hidden="true" />
          {job.postedAt ? "Posted" : "Reported"} <time dateTime={toIsoString(postedAt)} title={formatRelative(postedAt)}>{formatDateTime(postedAt)}</time>
        </li>
        {postedBy ? (
          <li className="flex items-center gap-1.5">
            <UserRound className="size-3.5" aria-hidden="true" />
            by {postedBy}
          </li>
        ) : null}
      </ul>
      <footer className="flex items-center justify-between border-t border-border pt-4">
        <span className="text-xs text-muted-foreground">{job.status === "open" ? `${job.applicants.length} technician${job.applicants.length === 1 ? "" : "s"} applied` : job.quote ? "Quoted" : "Estimated pay"}</span>
        <span className="text-base font-semibold tabular-nums text-foreground">{formatNaira(pay)}</span>
      </footer>
    </Card>
  );
}
