import type { MockDatabase } from "@/lib/mock-data";
import type { Notification } from "@/types";
import { createId, nowIso } from "@/lib/utils";
import { mutate, query } from "./client";

export function pushNotification(db: MockDatabase, input: Omit<Notification, "id" | "read" | "createdAt">): void {
  db.notifications.unshift({ ...input, id: createId("ntf"), read: false, createdAt: nowIso() });
}

export function notifyHospitalAdmins(db: MockDatabase, hospitalId: string, input: Omit<Notification, "id" | "read" | "createdAt" | "userId">): void {
  db.users
    .filter((user) => user.role === "hospital_admin" && user.hospitalId === hospitalId)
    .forEach((admin) => pushNotification(db, { ...input, userId: admin.id }));
}

export function listNotifications(userId: string): Promise<Notification[]> {
  return query((db) =>
    db.notifications
      .filter((notification) => notification.userId === userId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, 20),
  );
}

export function markAllNotificationsRead(userId: string): Promise<void> {
  return mutate((db) => {
    db.notifications.forEach((notification) => {
      if (notification.userId === userId) notification.read = true;
    });
  });
}
