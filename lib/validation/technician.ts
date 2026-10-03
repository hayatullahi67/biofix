import { z } from "zod";
import { technicianSkills } from "@/types";
import { phoneSchema } from "./auth";

export const technicianProfileSchema = z.object({
  name: z.string().trim().min(3, "Enter your full name"),
  phone: phoneSchema,
  area: z.string().trim().min(2, "Enter your area"),
  city: z.string().trim().min(2, "Enter your city"),
  bio: z.string().trim().max(280, "Keep your bio under 280 characters"),
  skills: z.array(z.enum(technicianSkills)).min(1, "Pick at least one skill"),
  avatarUrl: z.string().optional(),
  bankAccount: z
    .object({ bankName: z.string().trim(), accountNumber: z.string().trim(), accountName: z.string().trim() })
    .superRefine((bank, ctx) => {
      if (!bank.bankName && !bank.accountNumber && !bank.accountName) return;
      if (bank.bankName.length < 2) ctx.addIssue({ code: "custom", path: ["bankName"], message: "Enter your bank" });
      if (!/^\d{10}$/.test(bank.accountNumber)) ctx.addIssue({ code: "custom", path: ["accountNumber"], message: "Account numbers have 10 digits" });
      if (bank.accountName.length < 3) ctx.addIssue({ code: "custom", path: ["accountName"], message: "Enter the account name" });
    }),
});

export type TechnicianProfileValues = z.infer<typeof technicianProfileSchema>;
