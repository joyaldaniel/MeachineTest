"use client";

import { Pencil } from "lucide-react";

import { Badge } from "@/src/components/ui/Badge";
import { Checkbox } from "@/src/components/ui/Checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@/src/components/ui/Table";
import { Pagination } from "@/src/components/ui/Pagination";

import type { WaitlistUser } from "@/src/types/waitlist.types";

interface WaitlistTableProps {
  users: WaitlistUser[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onUserSelect: (user: WaitlistUser) => void;
}

function getBadgeVariant(
  status: WaitlistUser["status"],
): "pending" | "onboarded" | "rejected" | "invited" {
  switch (status) {
    case "Onboarded":
      return "onboarded";

    case "Rejected":
      return "rejected";

    case "Invited":
      return "invited";

    default:
      return "pending";
  }
}

export function WaitlistTable({
  users,
  currentPage,
  totalPages,
  onPageChange,
  onUserSelect,
}: WaitlistTableProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="overflow-hidden rounded-lg border border-slate-200/75 bg-white shadow-sm">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell className="w-9">
                <Checkbox
                  aria-label="Select all users"
                />
              </TableHeaderCell>

              <TableHeaderCell>
                Email
              </TableHeaderCell>

              <TableHeaderCell>
                Phone Number
              </TableHeaderCell>

              <TableHeaderCell>
                Postcode
              </TableHeaderCell>

              <TableHeaderCell>
                Vendor Type
              </TableHeaderCell>

              <TableHeaderCell>
                Service Offering
              </TableHeaderCell>

              <TableHeaderCell>
                Signup Date
              </TableHeaderCell>

              <TableHeaderCell>
                Status
              </TableHeaderCell>

              <TableHeaderCell className="w-12 text-center">
                Actions
              </TableHeaderCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Checkbox
                    aria-label={`Select ${user.email}`}
                  />
                </TableCell>

                <TableCell>
                  <span className="block max-w-28 truncate font-medium text-slate-700">
                    {user.email}
                  </span>
                </TableCell>

                <TableCell>
                  <span className="whitespace-nowrap">
                    {user.phoneNumber}
                  </span>
                </TableCell>

                <TableCell>
                  {user.postcode}
                </TableCell>

                <TableCell>
                  {user.vendorType}
                </TableCell>

                <TableCell>
                  <span className="block max-w-24">
                    {user.serviceOfferings.join(", ")}
                  </span>
                </TableCell>

                <TableCell>
                  {user.signupDate}
                </TableCell>

                <TableCell>
                  {user.status === "Pending" ? (
                    <span className="text-slate-400">
                      -
                    </span>
                  ) : (
                    <Badge
                      variant={getBadgeVariant(
                        user.status,
                      )}
                    >
                      {user.status}
                    </Badge>
                  )}
                </TableCell>

                <TableCell className="text-center">
                  <button
                    type="button"
                    onClick={() =>
                      onUserSelect(user)
                    }
                    aria-label={`Edit ${user.email}`}
                    className="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <Pencil className="size-3.5" />
                  </button>
                </TableCell>
              </TableRow>
            ))}

            {users.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="py-12 text-center text-sm text-slate-400"
                >
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-1 py-4">
        <span className="text-xs text-slate-400">
          {users.length > 0
            ? `Page ${currentPage} of ${totalPages}`
            : "No results"}
        </span>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}