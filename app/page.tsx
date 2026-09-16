"use client";

import { Search } from "lucide-react";
import { Suspense, useState } from "react";

import { Sidebar } from "@/src/components/layout/Sidebar";

import { Input } from "@/src/components/ui/Input";

import { FilterSidebar } from "@/src/components/modules/waitlist/FilterSidebar";
import { UserDetailModal } from "@/src/components/modules/waitlist/UserDetailModal";
import { WaitlistTable } from "@/src/components/modules/waitlist/WaitlistTable";
import { WaitlistTabs } from "@/src/components/modules/waitlist/WaitlistTabs";

import { waitlistUsers } from "@/src/data/waitlistUsers.data";

import { usePagination } from "@/src/hooks/usePagination";
import { useWaitlistFilter } from "@/src/hooks/useWaitlistFilter";

import type { WaitlistUser } from "@/src/types/waitlist.types";

const PAGE_SIZE = 10;

 function HomePageContent() {
  const [selectedUser, setSelectedUser] =
    useState<WaitlistUser | null>(null);

  const {
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
  } = useWaitlistFilter(waitlistUsers);

  const {
    paginatedData,
    setCurrentPage,
  } = usePagination(
    filteredUsers,
    PAGE_SIZE,
  );

  const handleOnboard = (
    user: WaitlistUser,
  ): void => {
    console.log("Onboard user:", user.id);
    setSelectedUser(null);
  };

  const handleReject = (
    user: WaitlistUser,
  ): void => {
    console.log("Reject user:", user.id);
    setSelectedUser(null);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-slate-200/75 bg-white">
            <div className="flex h-16 items-center justify-between px-5 lg:px-7">
              <div>
                <h1 className="text-base font-semibold text-slate-800">
                  Waitlist
                </h1>
              </div>

              <div className="relative w-56">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />

                <Input
                  value={filters.search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value,
                    )
                  }
                  placeholder="Search User"
                  aria-label="Search users"
                  className="h-8 pl-8 pr-3 text-xs"
                />
              </div>
            </div>
          </header>

          <div className="border-b border-slate-200/75 bg-white px-5 pt-2 lg:px-7">
            <WaitlistTabs
              activeTab={filters.tab}
              onChange={setTab}
            />
          </div>

          <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
            <FilterSidebar
              filters={filters}
              onPostcodeChange={setPostcode}
              onToggleStatus={
                toggleRegistrationStatus
              }
              onToggleVendor={
                toggleVendorType
              }
              onToggleService={
                toggleServiceOffering
              }
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
              onReset={resetFilters}
            />

            <section className="min-w-0 flex-1 p-4 lg:p-5">
              <div
                className={
                  isPending
                    ? "opacity-70 transition-opacity"
                    : "transition-opacity"
                }
              >
                <WaitlistTable
                  users={
                    paginatedData.items
                  }
                  currentPage={
                    paginatedData.currentPage
                  }
                  totalPages={
                    paginatedData.totalPages
                  }
                  onPageChange={
                    setCurrentPage
                  }
                  onUserSelect={
                    setSelectedUser
                  }
                />
              </div>
            </section>
          </div>
        </div>
      </div>

      <UserDetailModal
        user={selectedUser}
        onClose={() =>
          setSelectedUser(null)
        }
        onOnboard={handleOnboard}
        onReject={handleReject}
      />
    </main>
  );
}
export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageContent />
    </Suspense>
  );
}