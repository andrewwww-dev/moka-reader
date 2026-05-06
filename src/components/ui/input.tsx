import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 rounded-xl border border-border bg-bg-secondary px-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-purple",
        className,
      )}
      {...props}
    />
  );
}
