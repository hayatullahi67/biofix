import type { UserRole } from "@/types";

export const demoAccounts: Record<UserRole, { email: string; label: string; description: string }> = {
  hospital_admin: { email: "admin@biofix.demo", label: "Hospital Admin", description: "Grace Specialist Hospital" },
  nurse: { email: "nurse@biofix.demo", label: "Nurse", description: "ICU, Grace Specialist" },
  technician: { email: "tech@biofix.demo", label: "Technician", description: "Verified, Ikeja" },
  super_admin: { email: "super@biofix.demo", label: "Super Admin", description: "Biofix operations" },
};
