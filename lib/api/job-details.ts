import type { MockDatabase } from "@/lib/mock-data";
import type { Job, JobDetails, JobStatus, Technician } from "@/types";
import { jobTimelineLabels } from "@/lib/domain/job-flow";
import { createId, nowIso } from "@/lib/utils";
import { ApiError, findOrThrow } from "./client";
import { distanceKm } from "./geo";

export function expandJob(db: MockDatabase, job: Job, viewer?: Technician): JobDetails {
  const machine = findOrThrow(db.machines, job.machineId, "Machine");
  const hospital = findOrThrow(db.hospitals, job.hospitalId, "Hospital");
  const report = findOrThrow(db.reports, job.faultReportId, "Fault report");
  const reporter = db.users.find((user) => user.id === report.reportedBy);
  const technician = job.technicianId ? db.technicians.find((tech) => tech.id === job.technicianId) : undefined;
  const distance = viewer ? distanceKm(viewer.location, hospital.coordinates) : undefined;
  return { ...job, machine, hospital, report, reporter, technician, distanceKm: distance };
}

export function advanceJob(job: Job, status: JobStatus, actor?: string): void {
  const at = nowIso();
  job.status = status;
  job.updatedAt = at;
  job.timeline.push({ id: createId("evt"), status, label: jobTimelineLabels[status], at, actor });
}

export function assertStatus(job: Job, allowed: JobStatus[]): void {
  if (!allowed.includes(job.status)) {
    throw new ApiError("This job has moved on. Refresh to see its latest status.", 409);
  }
}
