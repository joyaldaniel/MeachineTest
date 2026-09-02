import type { ReactNode } from "react";

import { cn } from "@/src/lib/utils";

type BadgeVariant =
  | "pending"
  | "onboarded"
  | "rejected"
  | "invited";

interface BadgeProps {
  children: ReactNode;
  variant: BadgeVariant;
}

export function Badge({
  children,
  variant,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        {
          "bg-slate-100 text-slate-600":
            variant === "pending",

          "bg-emerald-50 text-emerald-700":
            variant === "onboarded",

          "bg-red-50 text-red-600":
            variant === "rejected",

          "bg-indigo-50 text-indigo-700":
            variant === "invited",
        },
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          {
            "bg-slate-400": variant === "pending",
            "bg-emerald-500": variant === "onboarded",
            "bg-red-500": variant === "rejected",
            "bg-indigo-500": variant === "invited",
          },
        )}
      />

      {children}
    </span>
  );
}