import { z } from "zod";

export const inviteSchema = z.object({
  name: z.string().trim().min(3, "Enter the nurse's full name"),
  contact: z
    .string()
    .trim()
    .refine((value) => z.email().safeParse(value).success || /^(\+234|0)[789][01]\d{8}$/.test(value.replace(/[\s-]/g, "")), "Enter an email or a Nigerian phone number"),
  ward: z.string().trim().optional(),
});

export type InviteValues = z.infer<typeof inviteSchema>;
