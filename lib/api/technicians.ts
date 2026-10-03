import type { Review, Technician, TechnicianDocument, TechnicianProfileInput, VerificationStatus } from "@/types";
import { createId, nowIso } from "@/lib/utils";
import { findOrThrow, mutate, query } from "./client";
import { pushNotification } from "./notifications";

export function listTechnicians(status?: VerificationStatus): Promise<Technician[]> {
  return query((db) => db.technicians.filter((tech) => !status || tech.verificationStatus === status));
}

export function getTechnician(id: string): Promise<Technician> {
  return query((db) => findOrThrow(db.technicians, id, "Technician"));
}

export function listReviews(technicianId: string): Promise<Review[]> {
  return query((db) => db.reviews.filter((review) => review.technicianId === technicianId).sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
}

export function reviewTechnician(id: string, decision: "verified" | "rejected", reason?: string): Promise<Technician> {
  return mutate((db) => {
    const technician = findOrThrow(db.technicians, id, "Technician");
    technician.verificationStatus = decision;
    technician.rejectionReason = decision === "rejected" ? reason : undefined;
    pushNotification(db, {
      userId: id,
      kind: "system",
      title: decision === "verified" ? "You're verified" : "Verification unsuccessful",
      body: decision === "verified" ? "You can now accept repair jobs on Biofix." : reason ?? "Please re-upload your documents.",
      href: "/tech/profile",
    });
    return technician;
  });
}

export function updateTechnicianProfile(id: string, input: TechnicianProfileInput): Promise<Technician> {
  return mutate((db) => {
    const technician = findOrThrow(db.technicians, id, "Technician");
    Object.assign(technician, { name: input.name, phone: input.phone, bio: input.bio, skills: input.skills, avatarUrl: input.avatarUrl, bankAccount: input.bankAccount });
    technician.location = { ...technician.location, area: input.area, city: input.city };
    return technician;
  });
}

export function uploadTechnicianDocument(id: string, document: Omit<TechnicianDocument, "id" | "uploadedAt">): Promise<Technician> {
  return mutate((db) => {
    const technician = findOrThrow(db.technicians, id, "Technician");
    technician.documents = [
      ...technician.documents.filter((existing) => existing.kind !== document.kind),
      { ...document, id: createId("doc"), uploadedAt: nowIso() },
    ];
    if (technician.verificationStatus === "rejected") technician.verificationStatus = "pending";
    return technician;
  });
}
