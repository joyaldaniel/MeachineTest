"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/src/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center gap-1"
    >
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() =>
          onPageChange(currentPage - 1)
        }
        aria-label="Previous page"
        className="flex size-7 items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft className="size-3.5" />
      </button>

      {pages.map((page) => (
        <button
          type="button"
          key={page}
          onClick={() => onPageChange(page)}
          aria-current={
            currentPage === page
              ? "page"
              : undefined
          }
          className={cn(
            "flex size-7 items-center justify-center rounded border text-xs",
            currentPage === page
              ? "border-sky-500 bg-sky-50 text-sky-600"
              : "border-slate-200 text-slate-600 hover:bg-slate-50",
          )}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() =>
          onPageChange(currentPage + 1)
        }
        aria-label="Next page"
        className="flex size-7 items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight className="size-3.5" />
      </button>
    </nav>
  );
}