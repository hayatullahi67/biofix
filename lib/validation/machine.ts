import { z } from "zod";
import { machineTypes } from "@/types";

export const machineSchema = z
  .object({
    name: z.string().trim().min(3, "Give the machine a name nurses will recognise"),
    type: z.enum(machineTypes, "Choose a machine type"),
    brand: z.string().trim().min(2, "Enter the brand"),
    model: z.string().trim().min(1, "Enter the model"),
    serialNumber: z.string().trim().min(4, "Enter the serial number"),
    ward: z.string().trim().min(2, "Enter the ward or department"),
    purchaseDate: z.string().min(1, "Enter the purchase date"),
    warrantyEnd: z.string().min(1, "Enter the warranty end date"),
    serviceIntervalMonths: z.number("Choose a service interval").int().min(1).max(24),
    photoUrl: z.string().optional(),
  })
  .refine((values) => values.warrantyEnd >= values.purchaseDate, { message: "Warranty can't end before purchase", path: ["warrantyEnd"] });

export type MachineFormValues = z.infer<typeof machineSchema>;
