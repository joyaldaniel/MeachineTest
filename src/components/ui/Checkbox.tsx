"use client";

import { Check } from "lucide-react";
import type { InputHTMLAttributes } from "react";

import { cn } from "@/src/lib/utils";

interface CheckboxProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type"
  > {
  label?: string;
}

export function Checkbox({
  label,
  className,
  id,
  ...props
}: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className="group flex cursor-pointer items-center gap-2 text-sm text-slate-600"
    >
      <span className="relative flex size-4 shrink-0 items-center justify-center">
        <input
          id={id}
          type="checkbox"
          className="peer sr-only"
          {...props}
        />

        <span
          className={cn(
            "flex size-4 items-center justify-center rounded border border-slate-300 bg-white transition-colors",
            "peer-checked:border-sky-600 peer-checked:bg-sky-600",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-sky-500 peer-focus-visible:ring-offset-1",
            className,
          )}
        >
          <Check className="hidden size-3 text-white peer-checked:block" />
        </span>
      </span>

      {label && <span>{label}</span>}
    </label>
  );
}