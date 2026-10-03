import type { FixReportInput, Job, QuoteInput } from "@/types";
import { createId, nowIso } from "@/lib/utils";
import { findOrThrow, mutate } from "./client";
import { advanceJob, assertStatus } from "./job-details";
import { notifyHospitalAdmins, pushNotification } from "./notifications";

export function findTechnician(jobId: string): Promise<Job> {
  return mutate((db) => {
    const job = findOrThrow(db.jobs, jobId, "Job");
    assertStatus(job, ["reported"]);
    advanceJob(job, "open", "Hospital admin");
    return job;
  });
}

export function acceptJob(jobId: string, technicianId: string): Promise<Job> {
  return mutate((db) => {
    const job = findOrThrow(db.jobs, jobId, "Job");
    const technician = findOrThrow(db.technicians, technicianId, "Technician");
    assertStatus(job, ["open"]);
    job.technicianId = technicianId;
    advanceJob(job, "accepted", technician.name);
    const machine = findOrThrow(db.machines, job.machineId, "Machine");
    machine.status = "in_repair";
    notifyHospitalAdmins(db, job.hospitalId, { kind: "job", title: "Technician assigned", body: `${technician.name} accepted the ${machine.name} job.`, href: `/hospital/jobs?job=${job.id}` });
    return job;
  });
}

export function markArrived(jobId: string): Promise<Job> {
  return mutate((db) => {
    const job = findOrThrow(db.jobs, jobId, "Job");
    assertStatus(job, ["accepted"]);
    advanceJob(job, "arrived", db.technicians.find((tech) => tech.id === job.technicianId)?.name);
    return job;
  });
}

export function sendQuote(jobId: string, input: QuoteInput): Promise<Job> {
  return mutate((db) => {
    const job = findOrThrow(db.jobs, jobId, "Job");
    assertStatus(job, ["arrived"]);
    const total = input.parts.reduce((sum, part) => sum + part.price, 0) + input.labour;
    job.quote = { ...input, total, sentAt: nowIso() };
    advanceJob(job, "quoted", db.technicians.find((tech) => tech.id === job.technicianId)?.name);
    notifyHospitalAdmins(db, job.hospitalId, { kind: "payment", title: "Quote received", body: `A quote of ₦${total.toLocaleString("en-NG")} is waiting for approval.`, href: `/hospital/jobs?job=${job.id}` });
    return job;
  });
}

export function approveQuote(jobId: string): Promise<Job> {
  return mutate((db) => {
    const job = findOrThrow(db.jobs, jobId, "Job");
    assertStatus(job, ["quoted"]);
    advanceJob(job, "approved", "Paystack");
    if (job.technicianId) {
      pushNotification(db, { userId: job.technicianId, kind: "payment", title: "Quote approved", body: "Payment is held in escrow. You can start the repair.", href: `/tech/jobs/${job.id}` });
    }
    return job;
  });
}

export function markFixed(jobId: string, input: FixReportInput): Promise<Job> {
  return mutate((db) => {
    const job = findOrThrow(db.jobs, jobId, "Job");
    assertStatus(job, ["approved"]);
    job.fixReport = { ...input, submittedAt: nowIso() };
    advanceJob(job, "fixed", db.technicians.find((tech) => tech.id === job.technicianId)?.name);
    notifyHospitalAdmins(db, job.hospitalId, { kind: "job", title: "Repair awaiting confirmation", body: "Check the machine and confirm the repair to release payment.", href: `/hospital/jobs?job=${job.id}` });
    return job;
  });
}

export function confirmJob(jobId: string): Promise<Job> {
  return mutate((db) => {
    const job = findOrThrow(db.jobs, jobId, "Job");
    assertStatus(job, ["fixed"]);
    advanceJob(job, "confirmed", "Hospital admin");
    const machine = findOrThrow(db.machines, job.machineId, "Machine");
    machine.status = "working";
    db.machineEvents.push({ id: createId("ev"), machineId: machine.id, type: "repair", title: "Repair confirmed", description: job.fixReport?.notes ?? "Repair confirmed by hospital.", date: nowIso(), actor: db.technicians.find((tech) => tech.id === job.technicianId)?.name });
    const amount = job.quote?.total ?? job.estimatedPay;
    const technician = db.technicians.find((tech) => tech.id === job.technicianId);
    if (technician) technician.completedJobs += 1;
    if (job.technicianId) {
      db.transactions.unshift({ id: createId("txn"), technicianId: job.technicianId, type: "job_payment", amount, status: "available", description: `${machine.name} repair`, createdAt: nowIso() });
      pushNotification(db, { userId: job.technicianId, kind: "payment", title: "Payment released", body: `₦${amount.toLocaleString("en-NG")} is now available to withdraw.`, href: "/tech/earnings" });
    }
    advanceJob(job, "paid", "Biofix");
    return job;
  });
}

export function rateJob(jobId: string, rating: number, comment: string): Promise<Job> {
  return mutate((db) => {
    const job = findOrThrow(db.jobs, jobId, "Job");
    job.rating = rating;
    const technician = job.technicianId ? db.technicians.find((tech) => tech.id === job.technicianId) : undefined;
    if (technician) {
      const hospital = findOrThrow(db.hospitals, job.hospitalId, "Hospital");
      db.reviews.unshift({ id: createId("rev"), technicianId: technician.id, hospitalId: hospital.id, hospitalName: hospital.name, jobId, rating, comment, createdAt: nowIso() });
      const count = Math.max(1, technician.completedJobs);
      technician.rating = Math.round(((technician.rating * (count - 1) + rating) / count) * 10) / 10;
    }
    return job;
  });
}
