import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import { cn } from "@/src/lib/utils";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "ghost";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

export function Button({
  children,
  variant = "primary",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        {
          "bg-sky-600 text-white hover:bg-sky-700":
            variant === "primary",

          "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50":
            variant === "secondary",

          "bg-red-500 text-white hover:bg-red-600":
            variant === "danger",

          "text-slate-600 hover:bg-slate-100":
            variant === "ghost",
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}