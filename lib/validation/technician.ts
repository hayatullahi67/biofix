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
});

export type TechnicianProfileValues = z.infer<typeof technicianProfileSchema>;
