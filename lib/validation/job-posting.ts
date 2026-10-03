import { z } from "zod";

const nigerianPhone = /^(\+234|0)[789][01]\d{8}$/;

export const contactShape = z.object({
  name: z.string().trim(),
  phone: z.string().trim(),
  email: z.string().trim(),
  allowMessages: z.boolean(),
});

export type ContactValues = z.infer<typeof contactShape>;

export function contactIssues(contact: ContactValues): { path: keyof ContactValues; message: string }[] {
  const issues: { path: keyof ContactValues; message: string }[] = [];
  if (contact.name.length < 2) issues.push({ path: "name", message: "Enter who technicians should ask for" });
  if (contact.phone && !nigerianPhone.test(contact.phone.replace(/[\s-]/g, ""))) issues.push({ path: "phone", message: "Enter a valid Nigerian phone number" });
  if (contact.email && !z.email().safeParse(contact.email).success) issues.push({ path: "email", message: "Enter a valid email address" });
  if (!contact.phone && !contact.email && !contact.allowMessages) {
    issues.push({ path: "allowMessages", message: "Give technicians at least one way to reach you" });
  }
  return issues;
}

export const contactSchema = contactShape.superRefine((contact, ctx) =>
  contactIssues(contact).forEach((issue) => ctx.addIssue({ code: "custom", path: [issue.path], message: issue.message })),
);

export const postJobSchema = z.object({ contact: contactSchema });
export const applySchema = z.object({ message: z.string().trim().min(10, "Tell the hospital a little about how you'll help (at least 10 characters)").max(500) });

export type PostJobValues = z.infer<typeof postJobSchema>;
export type ApplyValues = z.infer<typeof applySchema>;

export function toJobContact(values: ContactValues) {
  return { name: values.name, phone: values.phone || undefined, email: values.email || undefined, allowMessages: values.allowMessages };
}
