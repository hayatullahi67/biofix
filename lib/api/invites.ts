import type { AcceptInviteInput, InviteDetails, Session, User } from "@/types";
import { createId, daysFromNow, nowIso } from "@/lib/utils";
import { ApiError, mutate, query } from "./client";

export function getInvite(code: string): Promise<InviteDetails> {
  return query((db) => {
    const invite = db.invites.find((candidate) => candidate.code.toLowerCase() === code.toLowerCase());
    if (!invite || invite.status === "revoked") throw new ApiError("This invite link is no longer valid.", 404);
    const hospital = db.hospitals.find((candidate) => candidate.id === invite.hospitalId);
    return { ...invite, hospitalName: hospital?.name ?? "Your hospital", hospitalArea: hospital ? `${hospital.area}, ${hospital.city}` : "" };
  });
}

export function acceptInvite(code: string, input: AcceptInviteInput): Promise<Session> {
  return mutate((db) => {
    const invite = db.invites.find((candidate) => candidate.code.toLowerCase() === code.toLowerCase());
    if (!invite || invite.status !== "pending") throw new ApiError("This invite has already been used.", 410);
    const email = invite.contact.includes("@") ? invite.contact : `${invite.code.toLowerCase()}@nurse.biofix.ng`;
    const user: User = {
      id: createId("user"),
      name: input.name,
      email,
      phone: invite.contact.includes("@") ? "" : invite.contact,
      role: "nurse",
      hospitalId: invite.hospitalId,
      ward: invite.ward,
      createdAt: nowIso(),
    };
    db.users.push(user);
    db.credentials[email] = input.password;
    invite.status = "accepted";
    return { user, token: createId("tok"), expiresAt: daysFromNow(7) };
  });
}
