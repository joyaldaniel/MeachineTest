export const SERVICE_TYPES = [
  "Housekeeping",
  "Window Cleaning",
  "Car Valet",
] as const;

export const VENDOR_TYPES = [
  "Independent",
  "Company",
] as const;

export const WAITLIST_STATUSES = [
  "Pending",
  "Onboarded",
  "Rejected",
  "Invited",
] as const;

export type ServiceType = (typeof SERVICE_TYPES)[number];

export type VendorType = (typeof VENDOR_TYPES)[number];

export type WaitlistStatus = (typeof WAITLIST_STATUSES)[number];

export type WaitlistTab = "service-providers" | "customers";

export interface WaitlistUser {
  id: string;
  email: string;
  phoneNumber: string;
  postcode: string;
  vendorType: VendorType;
  serviceOfferings: ServiceType[];
  signupDate: string;
  status: WaitlistStatus;
  country: string;
  signedUpDate: string;
  customerType: "individual" | "company";
  notes: string;
}

export interface FilterOption {
  label: string;
  value: string;
}

export interface UserDetail {
  name: string;
  email: string;
  phoneNumber: string;
  country: string;
  signedUpDate: string;
  customerType: "individual" | "company";
  serviceOfferings: ServiceType[];
  notes: string;
}