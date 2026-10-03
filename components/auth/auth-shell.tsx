import { CircleCheck } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { Heading } from "@/components/ui/heading";

interface AuthShellProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const points = ["Live register of every machine", "QR fault reporting for nurses", "Verified biomedical technicians", "Escrow payments with Paystack"];

export function AuthShell({ title, description, children }: AuthShellProps) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-[1fr_minmax(0,560px)]">
      <main id="main-content" className="flex flex-col px-4 py-6 sm:px-10 lg:px-16">
        <header>
          <Logo />
        </header>
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-10">
          <div className="mb-8 space-y-2">
            <Heading level={1} className="font-display text-4xl font-normal tracking-[-0.01em] sm:text-4xl">{title}</Heading>
            <p className="text-sm text-muted-foreground sm:text-base">{description}</p>
          </div>
          {children}
        </div>
      </main>
      <aside aria-label="Why hospitals choose Biofix" className="relative hidden overflow-hidden bg-gradient-to-br from-teal-700 via-teal-800 to-teal-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="bg-grid absolute inset-0 opacity-20 [mask-image:radial-gradient(80%_60%_at_30%_10%,black,transparent)]" aria-hidden="true" />
        <p className="relative font-display text-4xl leading-tight">Keep every machine working.</p>
        <ul className="relative space-y-4">
          {points.map((point) => (
            <li key={point} className="flex items-center gap-3 text-teal-50/90">
              <CircleCheck className="size-5 text-teal-300" aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>
        <p className="relative text-sm text-teal-100/70">Trusted by hospitals across Lagos and Abuja.</p>
      </aside>
    </div>
  );
}
