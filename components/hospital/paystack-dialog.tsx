"use client";

import { Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { formatNaira } from "@/lib/utils";

interface PaystackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
  email: string;
  onPay: () => void;
  loading: boolean;
}

export function PaystackDialog({ open, onOpenChange, amount, email, onPay, loading }: PaystackDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent title="Pay with Paystack" description="Test mode: no real money will be charged." size="sm">
        <form
          className="space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            onPay();
          }}
        >
          <div className="rounded-xl bg-muted/60 p-4 text-center">
            <p className="text-xs text-muted-foreground">{email}</p>
            <p className="mt-1 text-3xl font-semibold tabular-nums">{formatNaira(amount)}</p>
          </div>
          <fieldset className="space-y-4">
            <legend className="sr-only">Card details</legend>
            <Field id="card-number" label="Card number">
              <Input id="card-number" inputMode="numeric" autoComplete="cc-number" defaultValue="4084 0840 8408 4081" />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field id="card-expiry" label="Expiry">
                <Input id="card-expiry" autoComplete="cc-exp" defaultValue="12/29" />
              </Field>
              <Field id="card-cvv" label="CVV">
                <Input id="card-cvv" inputMode="numeric" autoComplete="cc-csc" defaultValue="408" />
              </Field>
            </div>
          </fieldset>
          <Button type="submit" size="lg" className="w-full" loading={loading}>
            <Lock aria-hidden="true" />
            Pay {formatNaira(amount)}
          </Button>
          <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5 text-primary" aria-hidden="true" />
            Held in escrow until you confirm the repair
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
