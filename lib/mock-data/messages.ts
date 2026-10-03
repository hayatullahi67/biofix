import type { Message, MessageSenderSide } from "@/types";
import { hoursAgo } from "./dates";

type MessageRow = [jobId: string, technicianId: string, side: MessageSenderSide, senderId: string, senderName: string, body: string, hours: number];

const rows: MessageRow[] = [
  ["job-6", "tech-1", "technician", "tech-1", "Emeka Obi", "I can bring a replacement door seal sensor and fix it this afternoon.", 6],
  ["job-6", "tech-1", "hospital", "user-admin-1", "Adaeze Okafor", "Thanks Emeka. What would the sensor cost roughly?", 5],
  ["job-6", "tech-1", "technician", "tech-1", "Emeka Obi", "Around ₦35,000 for the part plus labour. I'll send an itemised quote once I inspect it.", 5],
  ["job-3", "tech-1", "hospital", "user-nurse-1", "Funmilayo Adebayo", "The monitor is in ICU bay 3. Ask for me at the nurses' station.", 28],
  ["job-3", "tech-1", "technician", "tech-1", "Emeka Obi", "Noted, I'm on my way.", 27],
  ["job-1", "tech-4", "technician", "tech-4", "Yetunde Alabi", "I service Dräger ventilators weekly and can be there within the hour.", 2],
];

export const seedMessages: Message[] = rows.map(([jobId, technicianId, senderSide, senderId, senderName, body, hours], index) => ({
  id: `msg-${index + 1}`,
  threadId: `${jobId}__${technicianId}`,
  jobId,
  technicianId,
  senderId,
  senderName,
  senderSide,
  body,
  createdAt: hoursAgo(hours),
}));
