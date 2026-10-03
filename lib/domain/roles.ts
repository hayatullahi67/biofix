import type { UserRole } from "@/types";

export const roleHome: Record<UserRole, string> = {
  hospital_admin: "/hospital",
  nurse: "/nurse",
  technician: "/tech",
  super_admin: "/admin",
};

export const roleLabels: Record<UserRole, string> = {
  hospital_admin: "Hospital Admin",
  nurse: "Nurse",
  technician: "Technician",
  super_admin: "Super Admin",
};

export function isSafeRedirect(path: string | null): path is string {
  return Boolean(path && path.startsWith("/") && !path.startsWith("//"));
}
