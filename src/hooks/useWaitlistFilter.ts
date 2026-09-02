"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { FilterState } from "../types/filter.types"; 
import type {
  ServiceType,
  VendorType,
  WaitlistStatus,
  WaitlistTab,
  WaitlistUser,
} from "@/src/types/waitlist.types";

const DEFAULT_FILTERS: FilterState = {
  search: "",
  postcode: "",
  registrationStatuses: [],
  vendorTypes: [],
  serviceOfferings: [],
  dateRange: {
    start: "",
    end: "",
  },
  tab: "customers",
};

interface UseWaitlistFilterReturn {
  filters: FilterState;
  filteredUsers: WaitlistUser[];
  isPending: boolean;
  setSearch: (value: string) => void;
  setPostcode: (value: string) => void;
  toggleRegistrationStatus: (value: WaitlistStatus) => void;
  toggleVendorType: (value: VendorType) => void;
  toggleServiceOffering: (value: ServiceType) => void;
  setStartDate: (value: string) => void;
  setEndDate: (value: string) => void;
  setTab: (value: WaitlistTab) => void;
  resetFilters: () => void;
}

function parseList<T extends string>(
  value: string | null,
  allowedValues: readonly T[],
): T[] {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .filter((item): item is T =>
      allowedValues.includes(item as T),
    );
}

function parseFilters(searchParams: URLSearchParams): FilterState {
  return {
    search: searchParams.get("search") ?? "",
    postcode: searchParams.get("postcode") ?? "",
    registrationStatuses: parseList(
      searchParams.get("status"),
      ["Onboarded", "Rejected", "Pending", "Invited"],
    ),
    vendorTypes: parseList(
      searchParams.get("vendor"),
      ["Independent", "Company"],
    ),
    serviceOfferings: parseList(
      searchParams.get("service"),
      ["Housekeeping", "Window Cleaning", "Car Valet"],
    ),
    dateRange: {
      start: searchParams.get("startDate") ?? "",
      end: searchParams.get("endDate") ?? "",
    },
    tab:
      searchParams.get("tab") === "service-providers"
        ? "service-providers"
        : "customers",
  };
}

export function useWaitlistFilter(
  users: WaitlistUser[],
): UseWaitlistFilterReturn {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFilters] =
    useState<FilterState>(DEFAULT_FILTERS);

  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const parsed = parseFilters(searchParams);

    setFilters(parsed);
    setDebouncedSearch(parsed.search);
  }, [searchParams]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, 300);

    return () => {
      window.clearTimeout(timer);
    };
  }, [filters.search]);

  const updateUrl = useCallback(
    (nextFilters: FilterState): void => {
      const params = new URLSearchParams();

      if (nextFilters.search) {
        params.set("search", nextFilters.search);
      }

      if (nextFilters.postcode) {
        params.set("postcode", nextFilters.postcode);
      }

      if (nextFilters.registrationStatuses.length > 0) {
        params.set(
          "status",
          nextFilters.registrationStatuses.join(","),
        );
      }

      if (nextFilters.vendorTypes.length > 0) {
        params.set(
          "vendor",
          nextFilters.vendorTypes.join(","),
        );
      }

      if (nextFilters.serviceOfferings.length > 0) {
        params.set(
          "service",
          nextFilters.serviceOfferings.join(","),
        );
      }

      if (nextFilters.dateRange.start) {
        params.set("startDate", nextFilters.dateRange.start);
      }

      if (nextFilters.dateRange.end) {
        params.set("endDate", nextFilters.dateRange.end);
      }

      params.set("tab", nextFilters.tab);

      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, {
          scroll: false,
        });
      });
    },
    [pathname, router],
  );

  const updateFilters = useCallback(
    (nextFilters: FilterState): void => {
      setFilters(nextFilters);
      updateUrl(nextFilters);
    },
    [updateUrl],
  );

  const setSearch = (value: string): void => {
    updateFilters({
      ...filters,
      search: value,
    });
  };

  const setPostcode = (value: string): void => {
    updateFilters({
      ...filters,
      postcode: value,
    });
  };

  const toggleRegistrationStatus = (
    value: WaitlistStatus,
  ): void => {
    const exists = filters.registrationStatuses.includes(value);

    updateFilters({
      ...filters,
      registrationStatuses: exists
        ? filters.registrationStatuses.filter(
            (status) => status !== value,
          )
        : [...filters.registrationStatuses, value],
    });
  };

  const toggleVendorType = (value: VendorType): void => {
    const exists = filters.vendorTypes.includes(value);

    updateFilters({
      ...filters,
      vendorTypes: exists
        ? filters.vendorTypes.filter(
            (vendor) => vendor !== value,
          )
        : [...filters.vendorTypes, value],
    });
  };

  const toggleServiceOffering = (
    value: ServiceType,
  ): void => {
    const exists = filters.serviceOfferings.includes(value);

    updateFilters({
      ...filters,
      serviceOfferings: exists
        ? filters.serviceOfferings.filter(
            (service) => service !== value,
          )
        : [...filters.serviceOfferings, value],
    });
  };

  const setStartDate = (value: string): void => {
    updateFilters({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        start: value,
      },
    });
  };

  const setEndDate = (value: string): void => {
    updateFilters({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        end: value,
      },
    });
  };

  const setTab = (value: WaitlistTab): void => {
    updateFilters({
      ...filters,
      tab: value,
    });
  };

  const resetFilters = (): void => {
    const nextFilters: FilterState = {
      ...DEFAULT_FILTERS,
      tab: filters.tab,
    };

    updateFilters(nextFilters);
  };

  const filteredUsers = useMemo(() => {
    const normalizedSearch = debouncedSearch
      .trim()
      .toLowerCase();

    const normalizedPostcode = filters.postcode
      .trim()
      .toLowerCase();

    return users.filter((user) => {
      const matchesTab =
        filters.tab === "customers"
          ? user.customerType === "individual" ||
            user.customerType === "company"
          : true;

      const matchesSearch =
        normalizedSearch.length === 0 ||
        [
          user.email,
          user.phoneNumber,
          user.postcode,
          user.vendorType,
          ...user.serviceOfferings,
        ].some((value) =>
          value.toLowerCase().includes(normalizedSearch),
        );

      const matchesPostcode =
        normalizedPostcode.length === 0 ||
        user.postcode
          .toLowerCase()
          .includes(normalizedPostcode);

      const matchesStatus =
        filters.registrationStatuses.length === 0 ||
        filters.registrationStatuses.includes(user.status);

      const matchesVendor =
        filters.vendorTypes.length === 0 ||
        filters.vendorTypes.includes(user.vendorType);

      const matchesService =
        filters.serviceOfferings.length === 0 ||
        filters.serviceOfferings.some((service) =>
          user.serviceOfferings.includes(service),
        );

      const [day, month, year] = user.signupDate.split("/");
      const userDate = new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
      );

      const startDate = filters.dateRange.start
        ? new Date(`${filters.dateRange.start}T00:00:00`)
        : null;

      const endDate = filters.dateRange.end
        ? new Date(`${filters.dateRange.end}T23:59:59`)
        : null;

      const matchesStartDate =
        !startDate || userDate >= startDate;

      const matchesEndDate =
        !endDate || userDate <= endDate;

      return (
        matchesTab &&
        matchesSearch &&
        matchesPostcode &&
        matchesStatus &&
        matchesVendor &&
        matchesService &&
        matchesStartDate &&
        matchesEndDate
      );
    });
  }, [
    debouncedSearch,
    filters,
    users,
  ]);

  return {
    filters,
    filteredUsers,
    isPending,
    setSearch,
    setPostcode,
    toggleRegistrationStatus,
    toggleVendorType,
    toggleServiceOffering,
    setStartDate,
    setEndDate,
    setTab,
    resetFilters,
  };
}