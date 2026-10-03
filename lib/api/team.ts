import type { Invite, InviteInput, User } from "@/types";
import { createId, nowIso } from "@/lib/utils";
import { findOrThrow, mutate, query } from "./client";

export function listNurses(hospitalId: string): Promise<User[]> {
  return query((db) => db.users.filter((user) => user.role === "nurse" && user.hospitalId === hospitalId));
}

export function listInvites(hospitalId: string): Promise<Invite[]> {
  return query((db) => db.invites.filter((invite) => invite.hospitalId === hospitalId && invite.status === "pending"));
}

export function inviteNurse(hospitalId: string, input: InviteInput): Promise<Invite> {
  return mutate((db) => {
    const hospital = findOrThrow(db.hospitals, hospitalId, "Hospital");
    const prefix = hospital.name.split(" ")[0]?.toUpperCase().slice(0, 5) ?? "BFX";
    const invite: Invite = {
      ...input,
      id: createId("inv"),
      code: createId(prefix),
      hospitalId,
      status: "pending",
      createdAt: nowIso(),
      lastSentAt: nowIso(),
    };
    db.invites.unshift(invite);
    return invite;
  });
}

export function resendInvite(inviteId: string): Promise<Invite> {
  return mutate((db) => {
    const invite = findOrThrow(db.invites, inviteId, "Invite");
    invite.lastSentAt = nowIso();
    return invite;
  });
}

export function revokeInvite(inviteId: string): Promise<void> {
  return mutate((db) => {
    findOrThrow(db.invites, inviteId, "Invite").status = "revoked";
  });
}

export function removeNurse(userId: string): Promise<void> {
  return mutate((db) => {
    db.users = db.users.filter((user) => user.id !== userId);
  });
}
