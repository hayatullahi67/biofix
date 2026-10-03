import { z } from "zod";
import { faultCategories } from "@/types";
import { contactIssues, contactShape } from "./job-posting";

export const reportSchema = z
  .object({
    machineId: z.string().min(1, "Choose the broken machine"),
    photos: z.array(z.string()).max(3),
    category: z.enum(faultCategories, "Pick what's wrong"),
    description: z.string().trim().min(10, "Describe the problem in a few words (at least 10 characters)"),
    urgency: z.enum(["low", "medium", "critical"]),
    postNow: z.boolean(),
    contact: contactShape,
  })
  .superRefine((values, ctx) => {
    if (!values.postNow) return;
    contactIssues(values.contact).forEach((issue) => ctx.addIssue({ code: "custom", path: ["contact", issue.path], message: issue.message }));
  });

export type ReportValues = z.infer<typeof reportSchema>;
