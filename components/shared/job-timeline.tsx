import { jobFlow, jobTimelineLabels } from "@/lib/domain/job-flow";
import type { Job, JobStatus } from "@/types";
import { Timeline, type TimelineTone } from "./timeline";

const tones: Partial<Record<JobStatus, TimelineTone>> = { reported: "danger", disputed: "danger", paid: "success", confirmed: "success", fixed: "primary" };

export function JobTimeline({ job }: { job: Pick<Job, "timeline" | "status"> }) {
  const reached = new Set(job.timeline.map((event) => event.status));
  const upcoming = job.status === "disputed" ? [] : jobFlow.filter((status) => !reached.has(status));
  return (
    <Timeline
      label="Job status timeline"
      items={[
        ...job.timeline.map((event) => ({ id: event.id, title: event.label, at: event.at, actor: event.actor, tone: tones[event.status] ?? "info" })),
        ...upcoming.map((status) => ({ id: `upcoming-${status}`, title: jobTimelineLabels[status], tone: "muted" as const })),
      ]}
    />
  );
}
