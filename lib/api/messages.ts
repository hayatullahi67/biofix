import type { MockDatabase } from "@/lib/mock-data";
import type { Message, MessageSenderSide, MessageThread } from "@/types";
import { createId, nowIso } from "@/lib/utils";
import { ApiError, mutate, query } from "./client";
import { notifyHospitalAdmins, pushNotification } from "./notifications";

export function threadIdFor(jobId: string, technicianId: string): string {
  return `${jobId}__${technicianId}`;
}

export function parseThreadId(threadId: string): { jobId: string; technicianId: string } {
  const [jobId = "", technicianId = ""] = threadId.split("__");
  return { jobId, technicianId };
}

interface NewMessage {
  threadId: string;
  senderId: string;
  senderName: string;
  senderSide: MessageSenderSide;
  body: string;
}

export function addMessage(db: MockDatabase, input: NewMessage): Message {
  const { jobId, technicianId } = parseThreadId(input.threadId);
  const message: Message = { ...input, id: createId("msg"), jobId, technicianId, createdAt: nowIso() };
  db.messages.push(message);
  return message;
}

function buildThreads(db: MockDatabase, filter: (message: Message) => boolean): MessageThread[] {
  const latest = new Map<string, Message>();
  db.messages.filter(filter).forEach((message) => {
    const current = latest.get(message.threadId);
    if (!current || current.createdAt < message.createdAt) latest.set(message.threadId, message);
  });
  return [...latest.values()]
    .map((message) => {
      const job = db.jobs.find((candidate) => candidate.id === message.jobId);
      const machine = db.machines.find((candidate) => candidate.id === job?.machineId);
      return {
        id: message.threadId,
        jobId: message.jobId,
        technicianId: message.technicianId,
        technicianName: db.technicians.find((tech) => tech.id === message.technicianId)?.name ?? "Technician",
        hospitalName: db.hospitals.find((hospital) => hospital.id === job?.hospitalId)?.name ?? "Hospital",
        machineName: machine?.name ?? "Machine",
        lastMessage: message.body,
        lastAt: message.createdAt,
        lastSenderSide: message.senderSide,
      };
    })
    .sort((a, b) => b.lastAt.localeCompare(a.lastAt));
}

export function listHospitalThreads(hospitalId: string): Promise<MessageThread[]> {
  return query((db) => {
    const jobIds = new Set(db.jobs.filter((job) => job.hospitalId === hospitalId).map((job) => job.id));
    return buildThreads(db, (message) => jobIds.has(message.jobId));
  });
}

export function listTechnicianThreads(technicianId: string): Promise<MessageThread[]> {
  return query((db) => buildThreads(db, (message) => message.technicianId === technicianId));
}

export function listMessages(threadId: string): Promise<Message[]> {
  return query((db) => db.messages.filter((message) => message.threadId === threadId).sort((a, b) => a.createdAt.localeCompare(b.createdAt)));
}

export function sendMessage(threadId: string, sender: { id: string; name: string; side: MessageSenderSide }, body: string): Promise<Message> {
  return mutate((db) => {
    const { jobId, technicianId } = parseThreadId(threadId);
    const job = db.jobs.find((candidate) => candidate.id === jobId);
    if (!job) throw new ApiError("This conversation is no longer available.", 404);
    if (job.contact?.allowMessages === false && sender.side === "technician") {
      throw new ApiError("This hospital prefers phone or email for this job.", 403);
    }
    const message = addMessage(db, { threadId, senderId: sender.id, senderName: sender.name, senderSide: sender.side, body });
    if (sender.side === "hospital") {
      pushNotification(db, { userId: technicianId, kind: "job", title: `New message from ${sender.name}`, body, href: `/tech/messages?thread=${threadId}` });
    } else {
      notifyHospitalAdmins(db, job.hospitalId, { kind: "job", title: `New message from ${sender.name}`, body, href: `/hospital/messages?thread=${threadId}` });
    }
    return message;
  });
}
