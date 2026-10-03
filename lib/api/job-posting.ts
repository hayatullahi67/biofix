import type { Job, JobContact } from "@/types";
import { createId, nowIso } from "@/lib/utils";
import { ApiError, findOrThrow, mutate } from "./client";
import { advanceJob, assertStatus } from "./job-details";
import { addMessage, threadIdFor } from "./messages";
import { notifyHospitalAdmins, pushNotification } from "./notifications";

export function postJob(jobId: string, contact: JobContact, posterId: string): Promise<Job> {
  return mutate((db) => {
    const job = findOrThrow(db.jobs, jobId, "Job");
    assertStatus(job, ["reported"]);
    const poster = db.users.find((user) => user.id === posterId);
    job.contact = contact;
    job.postedBy = posterId;
    job.postedAt = nowIso();
    advanceJob(job, "open", poster?.name);
    return job;
  });
}

export function applyToJob(jobId: string, technicianId: string, message: string): Promise<Job> {
  return mutate((db) => {
    const job = findOrThrow(db.jobs, jobId, "Job");
    const technician = findOrThrow(db.technicians, technicianId, "Technician");
    assertStatus(job, ["open"]);
    if (technician.verificationStatus !== "verified") throw new ApiError("Only verified technicians can apply for jobs.", 403);
    if (job.applications.some((application) => application.technicianId === technicianId)) {
      throw new ApiError("You've already applied for this job.", 409);
    }
    job.applications.push({ id: createId("app"), technicianId, message, createdAt: nowIso() });
    if (job.contact?.allowMessages !== false) {
      addMessage(db, { threadId: threadIdFor(job.id, technicianId), senderId: technicianId, senderName: technician.name, senderSide: "technician", body: message });
    }
    const machine = findOrThrow(db.machines, job.machineId, "Machine");
    notifyHospitalAdmins(db, job.hospitalId, { kind: "job", title: "New technician interested", body: `${technician.name} applied for the ${machine.name} job.`, href: `/hospital/jobs?job=${job.id}` });
    if (job.postedBy && db.users.some((user) => user.id === job.postedBy && user.role === "nurse")) {
      pushNotification(db, { userId: job.postedBy, kind: "job", title: "New technician interested", body: `${technician.name} applied for the ${machine.name} job.`, href: "/nurse/messages" });
    }
    return job;
  });
}

export function assignTechnician(jobId: string, technicianId: string): Promise<Job> {
  return mutate((db) => {
    const job = findOrThrow(db.jobs, jobId, "Job");
    const technician = findOrThrow(db.technicians, technicianId, "Technician");
    assertStatus(job, ["open"]);
    job.technicianId = technicianId;
    advanceJob(job, "accepted", technician.name);
    const machine = findOrThrow(db.machines, job.machineId, "Machine");
    machine.status = "in_repair";
    pushNotification(db, { userId: technicianId, kind: "job", title: "You got the job", body: `${machine.name} at ${findOrThrow(db.hospitals, job.hospitalId, "Hospital").name} is yours. Head over when ready.`, href: `/tech/jobs/${job.id}` });
    job.applications
      .filter((application) => application.technicianId !== technicianId)
      .forEach((application) => pushNotification(db, { userId: application.technicianId, kind: "job", title: "Job filled", body: `The ${machine.name} job was assigned to another technician.`, href: "/tech" }));
    return job;
  });
}
