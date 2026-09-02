import type {
  ServiceType,
  VendorType,
  WaitlistStatus,
} from "@/src/types/waitlist.types";

export interface FilterOptionItem<T extends string> {
  label: string;
  value: T;
}

export const registrationStatusOptions: FilterOptionItem<WaitlistStatus>[] = [
  {
    label: "Onboarded",
    value: "Onboarded",
  },
  {
    label: "Rejected",
    value: "Rejected",
  },
];

export const vendorTypeOptions: FilterOptionItem<VendorType>[] = [
  {
    label: "Independent",
    value: "Independent",
  },
  {
    label: "Company",
    value: "Company",
  },
];

export const serviceOfferingOptions: FilterOptionItem<ServiceType>[] = [
  {
    label: "Housekeeping",
    value: "Housekeeping",
  },
  {
    label: "Window Cleaning",
    value: "Window Cleaning",
  },
  {
    label: "Car Valet",
    value: "Car Valet",
  },
];