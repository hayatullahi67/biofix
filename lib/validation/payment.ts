import { z } from "zod";

export function withdrawSchema(available: number) {
  return z.object({
    amount: z.number("Enter an amount").min(1000, "Minimum withdrawal is ₦1,000").max(available, "That's more than your available balance"),
    bankName: z.string().trim().min(2, "Enter your bank"),
    accountNumber: z.string().trim().regex(/^\d{10}$/, "Account numbers have 10 digits"),
  });
}

export type WithdrawValues = z.infer<ReturnType<typeof withdrawSchema>>;
