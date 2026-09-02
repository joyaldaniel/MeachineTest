import type {
  ServiceType,
  VendorType,
  WaitlistStatus,
  WaitlistTab,
} from "./waitlist.types";

export interface DateRange {
  start: string;
  end: string;
}

export interface FilterState {
  search: string;
  postcode: string;
  registrationStatuses: WaitlistStatus[];
  vendorTypes: VendorType[];
  serviceOfferings: ServiceType[];
  dateRange: DateRange;
  tab: WaitlistTab;
}

export interface PaginationState {
  currentPage: number;
  pageSize: number;
}

export interface PaginationResult<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
}