export type InviteStatus = "pending" | "accepted" | "revoked";

export interface Invite {
  id: string;
  code: string;
  hospitalId: string;
  name: string;
  contact: string;
  ward?: string;
  status: InviteStatus;
  createdAt: string;
  lastSentAt: string;
}

export interface InviteInput {
  name: string;
  contact: string;
  ward?: string;
}

export interface InviteDetails extends Invite {
  hospitalName: string;
  hospitalArea: string;
}

export interface AcceptInviteInput {
  name: string;
  password: string;
}
