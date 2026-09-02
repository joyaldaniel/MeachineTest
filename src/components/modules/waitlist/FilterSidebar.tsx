"use client";

import { CalendarDays } from "lucide-react";

import { Button } from "@/src/components/ui/Button";
import { Checkbox } from "@/src/components/ui/Checkbox";
import { Input } from "@/src/components/ui/Input";

import {
  registrationStatusOptions,
  serviceOfferingOptions,
  vendorTypeOptions,
} from "@/src/data/filterOptions.data";

import type { FilterState } from "@/src/types/filter.types";
import type {
  ServiceType,
  VendorType,
  WaitlistStatus,
} from "@/src/types/waitlist.types";

interface FilterSidebarProps {
  filters: FilterState;
  onPostcodeChange: (value: string) => void;
  onToggleStatus: (
    value: WaitlistStatus,
  ) => void;
  onToggleVendor: (value: VendorType) => void;
  onToggleService: (
    value: ServiceType,
  ) => void;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onReset: () => void;
}

export function FilterSidebar({
  filters,
  onPostcodeChange,
  onToggleStatus,
  onToggleVendor,
  onToggleService,
  onStartDateChange,
  onEndDateChange,
  onReset,
}: FilterSidebarProps) {
  return (
    <aside className="w-full shrink-0 border-r border-slate-200/75 bg-white p-4 lg:w-56">
      <div className="space-y-5">
        <section>
          <label
            htmlFor="postcode"
            className="mb-2 block text-xs font-semibold text-slate-700"
          >
            Postcode
          </label>

          <Input
            id="postcode"
            value={filters.postcode}
            onChange={(event) =>
              onPostcodeChange(event.target.value)
            }
            placeholder="ZIP"
            aria-label="Postcode"
          />
        </section>

        <section>
          <h3 className="mb-3 text-xs font-semibold text-slate-700">
            Registration Status
          </h3>

          <div className="space-y-2.5">
            {registrationStatusOptions.map(
              (option) => (
                <Checkbox
                  key={option.value}
                  id={`status-${option.value}`}
                  label={option.label}
                  checked={filters.registrationStatuses.includes(
                    option.value,
                  )}
                  onChange={() =>
                    onToggleStatus(option.value)
                  }
                />
              ),
            )}
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-xs font-semibold text-slate-700">
            Date Registered
          </h3>

          <div className="grid grid-cols-2 gap-2">
            <label className="relative">
              <span className="sr-only">
                Start date
              </span>

              <Input
                type="date"
                value={filters.dateRange.start}
                onChange={(event) =>
                  onStartDateChange(
                    event.target.value,
                  )
                }
                className="pr-2"
              />

              <CalendarDays className="pointer-events-none absolute right-2 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
            </label>

            <label className="relative">
              <span className="sr-only">
                End date
              </span>

              <Input
                type="date"
                value={filters.dateRange.end}
                onChange={(event) =>
                  onEndDateChange(
                    event.target.value,
                  )
                }
                className="pr-2"
              />

              <CalendarDays className="pointer-events-none absolute right-2 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
            </label>
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-xs font-semibold text-slate-700">
            Vendor Type
          </h3>

          <div className="space-y-2.5">
            {vendorTypeOptions.map((option) => (
              <Checkbox
                key={option.value}
                id={`vendor-${option.value}`}
                label={option.label}
                checked={filters.vendorTypes.includes(
                  option.value,
                )}
                onChange={() =>
                  onToggleVendor(option.value)
                }
              />
            ))}
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-xs font-semibold text-slate-700">
            Service Offering
          </h3>

          <div className="space-y-2.5">
            {serviceOfferingOptions.map(
              (option) => (
                <Checkbox
                  key={option.value}
                  id={`service-${option.value}`}
                  label={option.label}
                  checked={filters.serviceOfferings.includes(
                    option.value,
                  )}
                  onChange={() =>
                    onToggleService(option.value)
                  }
                />
              ),
            )}
          </div>
        </section>

        <Button
          className="w-full"
          onClick={onReset}
        >
          Reset
        </Button>
      </div>
    </aside>
  );
}