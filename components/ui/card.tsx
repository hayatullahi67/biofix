import { cn } from "@/lib/utils";

type CardElement = "article" | "section" | "div" | "aside" | "li";

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  as?: CardElement;
  interactive?: boolean;
}

export function Card({ as: Tag = "div", interactive = false, className, ...props }: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-2xl border border-border bg-card text-card-foreground shadow-[var(--shadow-soft)]",
        interactive && "transition-[box-shadow,transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[var(--shadow-lift)]",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <header className={cn("flex items-start justify-between gap-4 p-5 pb-0 sm:p-6 sm:pb-0", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5 sm:p-6", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <footer className={cn("flex items-center gap-3 border-t border-border px-5 py-4 sm:px-6", className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}
