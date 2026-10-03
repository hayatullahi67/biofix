import type { Invite, Notification } from "@/types";
import { daysAgo, hoursAgo } from "./dates";

type NotificationRow = [userId: string, kind: Notification["kind"], title: string, body: string, href: string, hours: number, read: boolean];

const rows: NotificationRow[] = [
  ["user-admin-1", "job", "New fault reported", "Blessing Eze reported Obstetric Ultrasound in Maternity.", "/hospital/jobs?job=job-2", 1, false],
  ["user-admin-1", "payment", "Quote received", "Emeka Obi sent a ₦88,000 quote for Bedside Monitor A.", "/hospital/jobs?job=job-3", 5, false],
  ["user-admin-1", "job", "Repair awaiting confirmation", "Yetunde Alabi marked Neonatal Incubator 2 as fixed.", "/hospital/jobs?job=job-5", 9, true],
  ["user-admin-1", "system", "Service due this week", "4 machines are due for preventive maintenance.", "/hospital/equipment", 26, true],
  ["user-nurse-1", "job", "Technician on the way", "A verified technician accepted the Volumetric Pump 07 job.", "/nurse", 4, false],
  ["user-nurse-1", "job", "Machine back in service", "Haemodialysis Unit 1 repair was confirmed.", "/nurse", 30, true],
  ["tech-1", "job", "New critical job near you", "ICU Ventilator 1 at Grace Specialist Hospital, 2.2 km away.", "/tech/jobs/job-1", 3, false],
  ["tech-1", "payment", "Payment recorded", "Grace Specialist Hospital paid you ₦95,000 by bank transfer.", "/tech/earnings", 72, true],
  ["user-super-1", "system", "2 technicians awaiting review", "Halima Yusuf and Oluwaseun Adeyemi uploaded documents.", "/admin/technicians", 6, false],
  ["user-super-1", "payment", "Dispute opened", "Grace Specialist Hospital disputed job-15.", "/admin/jobs", 72, false],
];

export const seedNotifications: Notification[] = rows.map(([userId, kind, title, body, href, hours, read], index) => ({
  id: `ntf-${index + 1}`,
  userId,
  kind,
  title,
  body,
  href,
  read,
  createdAt: hoursAgo(hours),
}));

export const seedInvites: Invite[] = [
  { id: "inv-1", code: "GRACE-ICU-7Q2", hospitalId: "hosp-1", name: "Chiamaka Obi", contact: "chiamaka.obi@gmail.com", ward: "ICU", status: "pending", createdAt: daysAgo(2), lastSentAt: daysAgo(2) },
  { id: "inv-2", code: "GRACE-NICU-4KD", hospitalId: "hosp-1", name: "Hauwa Sani", contact: "+234 803 555 9012", ward: "NICU", status: "pending", createdAt: daysAgo(5), lastSentAt: daysAgo(1) },
  { id: "inv-3", code: "GRACE-ER-9PL", hospitalId: "hosp-1", name: "Aisha Bello", contact: "aisha.bello@gracespecialist.ng", ward: "Emergency", status: "accepted", createdAt: daysAgo(121), lastSentAt: daysAgo(121) },
];
