import type { JobApplication, JobContact } from "@/types";
import { hoursAgo } from "./dates";

export const seedContacts: Record<string, JobContact> = {
  "hosp-1": { name: "Adaeze Okafor (Admin)", phone: "+234 803 111 2201", email: "admin@gracespecialist.ng", allowMessages: true },
  "hosp-2": { name: "Babatunde Lawal", phone: "+234 809 111 2202", allowMessages: true },
  "hosp-3": { name: "Riverside front desk", phone: "+234 802 555 0110", email: "hello@riversidekids.ng", allowMessages: false },
  "hosp-4": { name: "Zainab Abdullahi", email: "zainab@unityspecialist.ng", allowMessages: true },
  "hosp-5": { name: "Mainland theatre manager", phone: "+234 701 555 0123", allowMessages: true },
};

const application = (id: string, technicianId: string, message: string, hours: number): JobApplication => ({
  id,
  technicianId,
  message,
  createdAt: hoursAgo(hours),
});

export const seedApplications: Record<string, JobApplication[]> = {
  "job-1": [
    application("app-1", "tech-4", "I service Dräger ventilators weekly and can be there within the hour.", 2),
    application("app-2", "tech-5", "Available today. I have Savina pressure sensors in stock.", 1),
  ],
  "job-6": [application("app-3", "tech-1", "I can bring a replacement door seal sensor and fix it this afternoon.", 6)],
  "job-7": [application("app-4", "tech-4", "I'm in Yaba and can reach Lekki in 40 minutes.", 3)],
  "job-10": [application("app-5", "tech-2", "I'm 10 minutes away in Garki. Fresenius certified.", 3)],
};
