import type { JobDetails } from "@/types";
import { activeTechnicianStatuses, skillForMachineType } from "@/lib/domain/job-flow";
import { findOrThrow, query } from "./client";
import { expandJob } from "./job-details";

const byNewest = (a: JobDetails, b: JobDetails) => b.updatedAt.localeCompare(a.updatedAt);

export function listHospitalJobs(hospitalId: string): Promise<JobDetails[]> {
  return query((db) => db.jobs.filter((job) => job.hospitalId === hospitalId).map((job) => expandJob(db, job)).sort(byNewest));
}

export function listAllJobs(): Promise<JobDetails[]> {
  return query((db) => db.jobs.map((job) => expandJob(db, job)).sort(byNewest));
}

export function getJob(id: string, technicianId?: string): Promise<JobDetails> {
  return query((db) => {
    const viewer = technicianId ? db.technicians.find((tech) => tech.id === technicianId) : undefined;
    return expandJob(db, findOrThrow(db.jobs, id, "Job"), viewer);
  });
}

export function listOpenJobs(technicianId: string): Promise<JobDetails[]> {
  return query((db) => {
    const technician = findOrThrow(db.technicians, technicianId, "Technician");
    return db.jobs
      .filter((job) => job.status === "open")
      .map((job) => expandJob(db, job, technician))
      .filter((job) => technician.skills.includes(skillForMachineType[job.machine.type]))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  });
}

export function listTechnicianJobs(technicianId: string): Promise<JobDetails[]> {
  return query((db) => {
    const technician = findOrThrow(db.technicians, technicianId, "Technician");
    return db.jobs
      .filter((job) => job.technicianId === technicianId || (job.status === "open" && job.applications.some((application) => application.technicianId === technicianId)))
      .map((job) => expandJob(db, job, technician))
      .sort(byNewest);
  });
}

export function getActiveJobForMachine(machineId: string): Promise<JobDetails | null> {
  return query((db) => {
    const job = db.jobs.find((candidate) => candidate.machineId === machineId && ["reported", "open", ...activeTechnicianStatuses].includes(candidate.status));
    return job ? expandJob(db, job) : null;
  });
}
