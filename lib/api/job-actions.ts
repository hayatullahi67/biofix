import type { FixReportInput, Job, PaymentMethod, QuoteInput } from "@/types";
import { createId, nowIso } from "@/lib/utils";
import { findOrThrow, mutate } from "./client";
import { advanceJob, assertStatus } from "./job-details";
import { notifyHospitalAdmins, pushNotification } from "./notifications";

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
    advanceJob(job, "approved", "Hospital admin");
    if (job.technicianId) {
      pushNotification(db, { userId: job.technicianId, kind: "job", title: "Quote approved", body: "The hospital approved your quote. You can start the repair.", href: `/tech/jobs/${job.id}` });
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
    const technician = db.technicians.find((tech) => tech.id === job.technicianId);
    db.machineEvents.push({ id: createId("ev"), machineId: machine.id, type: "repair", title: "Repair confirmed", description: job.fixReport?.notes ?? "Repair confirmed by hospital.", date: nowIso(), actor: technician?.name });
    if (technician) {
      technician.completedJobs += 1;
      pushNotification(db, { userId: technician.id, kind: "job", title: "Repair confirmed", body: `${machine.name} is back in service. The hospital will pay you directly.`, href: `/tech/jobs/${job.id}` });
    }
    return job;
  });
}

export function markPaid(jobId: string, method: PaymentMethod): Promise<Job> {
  return mutate((db) => {
    const job = findOrThrow(db.jobs, jobId, "Job");
    assertStatus(job, ["confirmed"]);
    const amount = job.quote?.total ?? job.estimatedPay;
    const paidAt = nowIso();
    job.payment = { method, amount, paidAt };
    advanceJob(job, "paid", "Hospital admin");
    const machine = findOrThrow(db.machines, job.machineId, "Machine");
    if (job.technicianId) {
      db.transactions.unshift({ id: createId("txn"), technicianId: job.technicianId, jobId, amount, method, description: `${machine.name} repair`, createdAt: paidAt });
      const via = method === "cash" ? "in cash" : "by bank transfer";
      pushNotification(db, { userId: job.technicianId, kind: "payment", title: "Payment recorded", body: `The hospital recorded paying you ₦${amount.toLocaleString("en-NG")} ${via}.`, href: "/tech/earnings" });
    }
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
