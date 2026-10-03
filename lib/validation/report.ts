import { z } from "zod";
import { faultCategories } from "@/types";

export const reportSchema = z.object({
  machineId: z.string().min(1, "Choose the broken machine"),
  photos: z.array(z.string()).max(3),
  category: z.enum(faultCategories, "Pick what's wrong"),
  description: z.string().trim().min(10, "Describe the problem in a few words (at least 10 characters)"),
  urgency: z.enum(["low", "medium", "critical"]),
});

export type ReportValues = z.infer<typeof reportSchema>;
