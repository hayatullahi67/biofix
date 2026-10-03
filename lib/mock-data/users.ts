import type { User, UserRole } from "@/types";
import { daysAgo } from "./dates";

export const DEMO_PASSWORD = "biofix123";

export const seedUsers: User[] = [
  { id: "user-admin-1", name: "Adaeze Okafor", email: "admin@biofix.demo", phone: "+234 803 111 2201", role: "hospital_admin", hospitalId: "hosp-1", createdAt: daysAgo(420) },
  { id: "user-admin-2", name: "Babatunde Lawal", email: "babatunde@harmonymedical.ng", phone: "+234 809 111 2202", role: "hospital_admin", hospitalId: "hosp-2", createdAt: daysAgo(300) },
  { id: "user-admin-3", name: "Zainab Abdullahi", email: "zainab@unityspecialist.ng", phone: "+234 806 111 2203", role: "hospital_admin", hospitalId: "hosp-4", createdAt: daysAgo(260) },
  { id: "user-nurse-1", name: "Funmilayo Adebayo", email: "nurse@biofix.demo", phone: "+234 802 222 3301", role: "nurse", hospitalId: "hosp-1", ward: "ICU", createdAt: daysAgo(380) },
  { id: "user-nurse-2", name: "Blessing Eze", email: "blessing.eze@gracespecialist.ng", phone: "+234 802 222 3302", role: "nurse", hospitalId: "hosp-1", ward: "Maternity", createdAt: daysAgo(300) },
  { id: "user-nurse-3", name: "Ngozi Nwosu", email: "ngozi.nwosu@gracespecialist.ng", phone: "+234 802 222 3303", role: "nurse", hospitalId: "hosp-1", ward: "Theatre", createdAt: daysAgo(210) },
  { id: "user-nurse-4", name: "Aisha Bello", email: "aisha.bello@gracespecialist.ng", phone: "+234 802 222 3304", role: "nurse", hospitalId: "hosp-1", ward: "Emergency", createdAt: daysAgo(120) },
  { id: "user-nurse-5", name: "Temitope Ogunleye", email: "temitope@gracespecialist.ng", phone: "+234 802 222 3305", role: "nurse", hospitalId: "hosp-1", ward: "Paediatrics", createdAt: daysAgo(45) },
  { id: "user-super-1", name: "Tunde Bakare", email: "super@biofix.demo", phone: "+234 700 246 3349", role: "super_admin", createdAt: daysAgo(500) },
];

export const demoAccounts: Record<UserRole, { email: string; label: string; description: string }> = {
  hospital_admin: { email: "admin@biofix.demo", label: "Hospital Admin", description: "Grace Specialist Hospital" },
  nurse: { email: "nurse@biofix.demo", label: "Nurse", description: "ICU, Grace Specialist" },
  technician: { email: "tech@biofix.demo", label: "Technician", description: "Verified, Ikeja" },
  super_admin: { email: "super@biofix.demo", label: "Super Admin", description: "Biofix operations" },
};
