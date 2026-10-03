"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Landmark } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Field, fieldAria } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useWithdraw } from "@/hooks/use-payments";
import { formatNaira } from "@/lib/utils";
import { withdrawSchema, type WithdrawValues } from "@/lib/validation/payment";
import type { BankAccount } from "@/types";

interface WithdrawDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  available: number;
  bankAccount?: BankAccount;
}

export function WithdrawDialog({ open, onOpenChange, available, bankAccount }: WithdrawDialogProps) {
  const withdraw = useWithdraw(() => onOpenChange(false));
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<WithdrawValues>({
    resolver: zodResolver(withdrawSchema(available)),
    values: { amount: available, bankName: bankAccount?.bankName ?? "", accountNumber: bankAccount?.accountNumber ?? "" },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent title="Withdraw to bank" description={`Available balance: ${formatNaira(available)}`} size="sm">
        <form onSubmit={handleSubmit((values) => withdraw.mutate(values))} noValidate className="space-y-5">
          <Field id="withdraw-amount" label="Amount (₦)" error={errors.amount?.message}>
            <div className="flex gap-2">
              <Input {...fieldAria("withdraw-amount", errors.amount?.message)} type="number" inputMode="numeric" {...register("amount", { valueAsNumber: true })} />
              <Button variant="outline" onClick={() => setValue("amount", available)}>Max</Button>
            </div>
          </Field>
          <Field id="bank-name" label="Bank" error={errors.bankName?.message}>
            <Input {...fieldAria("bank-name", errors.bankName?.message)} placeholder="GTBank" {...register("bankName")} />
          </Field>
          <Field id="account-number" label="Account number" error={errors.accountNumber?.message}>
            <Input {...fieldAria("account-number", errors.accountNumber?.message)} inputMode="numeric" maxLength={10} placeholder="0123456789" {...register("accountNumber")} />
          </Field>
          <Button type="submit" size="lg" className="w-full" loading={withdraw.isPending} disabled={available < 1000}>
            <Landmark aria-hidden="true" />
            Withdraw
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
