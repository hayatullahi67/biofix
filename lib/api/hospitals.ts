import type { Hospital, HospitalProfileInput, HospitalSummary, SubscriptionPlan } from "@/types";
import { findOrThrow, mutate, query } from "./client";

const openStatuses = ["reported", "open", "accepted", "arrived", "quoted", "approved", "fixed"];

export function listHospitals(): Promise<HospitalSummary[]> {
  return query((db) =>
    db.hospitals.map((hospital) => ({
      ...hospital,
      machinesCount: db.machines.filter((machine) => machine.hospitalId === hospital.id).length,
      openJobsCount: db.jobs.filter((job) => job.hospitalId === hospital.id && openStatuses.includes(job.status)).length,
    })),
  );
}

export function getHospital(id: string): Promise<Hospital> {
  return query((db) => findOrThrow(db.hospitals, id, "Hospital"));
}

export function updateHospitalProfile(id: string, input: HospitalProfileInput): Promise<Hospital> {
  return mutate((db) => Object.assign(findOrThrow(db.hospitals, id, "Hospital"), input));
}

export function changePlan(id: string, plan: SubscriptionPlan): Promise<Hospital> {
  return mutate((db) => {
    const hospital = findOrThrow(db.hospitals, id, "Hospital");
    hospital.plan = plan;
    hospital.status = "active";
    return hospital;
  });
}
