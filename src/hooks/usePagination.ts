"use client";

import { useMemo, useState } from "react";

import type { PaginationResult } from "../types/filter.types"; 

interface UsePaginationReturn<T> {
  paginatedData: PaginationResult<T>;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  resetPage: () => void;
}

export function usePagination<T>(
  items: T[],
  pageSize: number,
): UsePaginationReturn<T> {
  const [currentPage, setCurrentPageState] = useState<number>(1);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  const safePage = Math.min(currentPage, totalPages);

  const paginatedData = useMemo<PaginationResult<T>>(() => {
    const startIndex = (safePage - 1) * pageSize;

    return {
      items: items.slice(startIndex, startIndex + pageSize),
      currentPage: safePage,
      totalPages,
      totalItems: items.length,
      pageSize,
    };
  }, [items, pageSize, safePage, totalPages]);

  const setCurrentPage = (page: number): void => {
    const nextPage = Math.min(Math.max(page, 1), totalPages);
    setCurrentPageState(nextPage);
  };

  const resetPage = (): void => {
    setCurrentPageState(1);
  };

  return {
    paginatedData,
    currentPage: safePage,
    setCurrentPage,
    resetPage,
  };
}