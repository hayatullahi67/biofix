import type { MockDatabase } from "@/lib/mock-data";
import { DEMO_PASSWORD, demoAccounts } from "@/lib/mock-data";
import type { HospitalSignupInput, LoginInput, Session, TechnicianSignupInput, User, UserRole } from "@/types";
import { createId, daysFromNow, nowIso } from "@/lib/utils";
import { ApiError, mutate, query } from "./client";

function findAccount(db: MockDatabase, email: string): User | undefined {
  const normalized = email.trim().toLowerCase();
  return [...db.users, ...db.technicians].find((user) => user.email.toLowerCase() === normalized);
}

function createSession(user: User): Session {
  return { user, token: createId("tok"), expiresAt: daysFromNow(7) };
}

export function login({ email, password }: LoginInput): Promise<Session> {
  return mutate((db) => {
    const user = findAccount(db, email);
    const expected = user ? db.credentials[user.email] ?? DEMO_PASSWORD : undefined;
    if (!user || password !== expected) throw new ApiError("That email and password don't match an account.", 401);
    return createSession(user);
  });
}

export function loginAsDemo(role: UserRole): Promise<Session> {
  return login({ email: demoAccounts[role].email, password: DEMO_PASSWORD });
}

function assertEmailFree(db: MockDatabase, email: string): void {
  if (findAccount(db, email)) throw new ApiError("An account with this email already exists.", 409);
}

export function signupHospital(input: HospitalSignupInput): Promise<Session> {
  return mutate((db) => {
    assertEmailFree(db, input.email);
    const hospitalId = createId("hosp");
    db.hospitals.push({
      id: hospitalId,
      name: input.hospitalName,
      area: input.city,
      city: input.city,
      state: input.city,
      address: input.city,
      phone: input.phone,
      email: input.email,
      plan: "free",
      status: "trial",
      bedCount: 0,
      coordinates: { lat: 6.5244, lng: 3.3792 },
      createdAt: nowIso(),
    });
    const user: User = { id: createId("user"), name: input.adminName, email: input.email, phone: input.phone, role: "hospital_admin", hospitalId, createdAt: nowIso() };
    db.users.push(user);
    db.credentials[user.email] = input.password;
    return createSession(user);
  });
}

export function signupTechnician(input: TechnicianSignupInput): Promise<Session> {
  return mutate((db) => {
    assertEmailFree(db, input.email);
    const technician = {
      id: createId("tech"),
      name: input.name,
      email: input.email,
      phone: input.phone,
      role: "technician" as const,
      bio: "",
      skills: input.skills,
      location: { area: input.city, city: input.city, lat: 6.5244, lng: 3.3792 },
      verificationStatus: "pending" as const,
      rating: 0,
      completedJobs: 0,
      yearsExperience: 0,
      documents: [],
      createdAt: nowIso(),
    };
    db.technicians.push(technician);
    db.credentials[technician.email] = input.password;
    return createSession(technician);
  });
}

export function getCurrentUser(userId: string): Promise<User> {
  return query((db) => {
    const user = [...db.users, ...db.technicians].find((candidate) => candidate.id === userId);
    if (!user) throw new ApiError("Your session has expired.", 401);
    return user;
  });
}
