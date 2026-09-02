"use client";

import type { WaitlistTab } from "@/src/types/waitlist.types";

interface WaitlistTabsProps {
  activeTab: WaitlistTab;
  onChange: (tab: WaitlistTab) => void;
}

export function WaitlistTabs({
  activeTab,
  onChange,
}: WaitlistTabsProps) {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() =>
          onChange("service-providers")
        }
        className={
          activeTab === "service-providers"
            ? "rounded-md border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700"
            : "rounded-md border border-transparent px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-50"
        }
      >
        Service Providers
      </button>

      <button
        type="button"
        onClick={() => onChange("customers")}
        className={
          activeTab === "customers"
            ? "rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm"
            : "rounded-md border border-transparent px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-50"
        }
      >
        Customers
      </button>
    </div>
  );
}