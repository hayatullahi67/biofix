import { z } from "zod";

export const quoteSchema = z.object({
  parts: z.array(z.object({ name: z.string().trim().min(2, "Name the part"), price: z.number("Enter a price").min(0, "Price can't be negative") })),
  labour: z.number("Enter your labour cost").min(1000, "Labour should be at least ₦1,000"),
  note: z.string().trim().max(240).optional(),
});

export const fixReportSchema = z.object({
  beforePhotos: z.array(z.string()).max(3),
  afterPhotos: z.array(z.string()).min(1, "Add at least one photo of the fixed machine").max(3),
  notes: z.string().trim().min(10, "Describe what you fixed (at least 10 characters)"),
  partsUsed: z.string().trim().min(2, "List the parts you used, or write 'None'"),
});

export type QuoteValues = z.infer<typeof quoteSchema>;
export type FixReportValues = z.infer<typeof fixReportSchema>;
