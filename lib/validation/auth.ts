import { z } from "zod";
import { technicianSkills } from "@/types";

export const phoneSchema = z
  .string()
  .trim()
  .refine((value) => /^(\+234|0)[789][01]\d{8}$/.test(value.replace(/[\s-]/g, "")), "Enter a valid Nigerian phone number, e.g. 0803 123 4567");
const phone = phoneSchema;
const password = z.string().min(8, "Use at least 8 characters");

export const loginSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(1, "Enter your password"),
});

export const hospitalSignupSchema = z.object({
  hospitalName: z.string().trim().min(3, "Enter your hospital's name"),
  adminName: z.string().trim().min(3, "Enter your full name"),
  email: z.email("Enter a valid work email"),
  phone,
  city: z.string().trim().min(2, "Enter your city"),
  password,
});

export const technicianSignupSchema = z.object({
  name: z.string().trim().min(3, "Enter your full name"),
  email: z.email("Enter a valid email address"),
  phone,
  city: z.string().trim().min(2, "Enter your city"),
  skills: z.array(z.enum(technicianSkills)).min(1, "Pick at least one skill"),
  password,
});

export const acceptInviteSchema = z
  .object({
    name: z.string().trim().min(3, "Enter your full name"),
    password,
    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, { message: "Passwords don't match", path: ["confirmPassword"] });

export type LoginValues = z.infer<typeof loginSchema>;
export type HospitalSignupValues = z.infer<typeof hospitalSignupSchema>;
export type TechnicianSignupValues = z.infer<typeof technicianSignupSchema>;
export type AcceptInviteValues = z.infer<typeof acceptInviteSchema>;
