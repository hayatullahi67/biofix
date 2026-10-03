import { z } from "zod";
import { phoneSchema } from "./auth";

export const hospitalProfileSchema = z.object({
  name: z.string().trim().min(3, "Enter the hospital name"),
  area: z.string().trim().min(2, "Enter the area"),
  city: z.string().trim().min(2, "Enter the city"),
  state: z.string().trim().min(2, "Enter the state"),
  address: z.string().trim().min(5, "Enter the street address"),
  phone: phoneSchema,
  email: z.email("Enter a valid email"),
  bedCount: z.number("Enter the number of beds").int().min(0),
});

export type HospitalProfileValues = z.infer<typeof hospitalProfileSchema>;
