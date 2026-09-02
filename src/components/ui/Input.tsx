import type { InputHTMLAttributes } from "react";

import { cn } from "@/src/lib/utils";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({
  className,
  ...props
}: InputProps) {
  return (
    <input
      className={cn(
        "w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100",
        className,
      )}
      {...props}
    />
  );
}