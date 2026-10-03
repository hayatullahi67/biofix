import type { JobContact } from "./job";

export type MessageSenderSide = "hospital" | "technician";

export interface Message {
  id: string;
  threadId: string;
  jobId: string;
  technicianId: string;
  senderId: string;
  senderName: string;
  senderSide: MessageSenderSide;
  body: string;
  createdAt: string;
}

export interface MessageThread {
  id: string;
  jobId: string;
  technicianId: string;
  technicianName: string;
  hospitalName: string;
  machineName: string;
  lastMessage: string;
  lastAt: string;
  lastSenderSide: MessageSenderSide;
}

export interface SendMessageInput {
  threadId: string;
  body: string;
}

export interface PostJobInput {
  contact: JobContact;
}
