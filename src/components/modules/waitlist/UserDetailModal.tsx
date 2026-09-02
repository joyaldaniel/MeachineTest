"use client";

import { Pencil } from "lucide-react";
import { useState } from "react";

import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { Modal } from "@/src/components/ui/Modal";

import type { WaitlistUser } from "@/src/types/waitlist.types";

interface UserDetailModalProps {
  user: WaitlistUser | null;
  onClose: () => void;
  onOnboard: (user: WaitlistUser) => void;
  onReject: (user: WaitlistUser) => void;
}

export function UserDetailModal({
  user,
  onClose,
  onOnboard,
  onReject,
}: UserDetailModalProps) {
  const [editingNotes, setEditingNotes] =
    useState(false);

  const [notes, setNotes] = useState("");

  if (!user) {
    return null;
  }

  const displayName =
    user.customerType === "company"
      ? "CleanPro Solutions"
      : user.email
          .split("@")[0]
          .replace(/^\w/, (letter) =>
            letter.toUpperCase(),
          );

  const handleClose = (): void => {
    setEditingNotes(false);
    onClose();
  };

  return (
    <Modal
      open={Boolean(user)}
      onClose={handleClose}
      title="User Details"
      className="max-w-md"
    >
      <div className="space-y-5 px-5 py-4">
        <section>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-800">
                {displayName}
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                {user.email}
              </p>
            </div>

            <div className="flex items-center gap-1">
              <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] text-slate-500">
                Customer
              </span>

              <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] text-slate-500">
                invited
              </span>
            </div>
          </div>
        </section>

        <section>
          <h4 className="mb-2 text-xs font-semibold text-slate-700">
            Contact Information
          </h4>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-slate-400">
                Email
              </p>

              <p className="mt-1 truncate text-slate-600">
                {user.email}
              </p>
            </div>

            <div>
              <p className="text-slate-400">
                Phone
              </p>

              <p className="mt-1 text-slate-600">
                {user.phoneNumber}
              </p>
            </div>

            <div>
              <p className="text-slate-400">
                Country
              </p>

              <p className="mt-1 text-slate-600">
                {user.country}
              </p>
            </div>

            <div>
              <p className="text-slate-400">
                Signed up
              </p>

              <p className="mt-1 text-slate-600">
                {user.signedUpDate}
              </p>
            </div>
          </div>
        </section>

        <section>
          <h4 className="mb-2 text-xs font-semibold text-slate-700">
            Customer Details
          </h4>

          <div className="space-y-2 text-xs">
            <div>
              <p className="text-slate-400">
                Type
              </p>

              <p className="mt-1 capitalize text-slate-600">
                {user.customerType}
              </p>
            </div>

            <div>
              <p className="text-slate-400">
                User Details
              </p>

              <p className="mt-1 text-slate-600">
                {user.serviceOfferings.join("    ")}
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-2 flex items-center justify-between">
            <h4 className="text-xs font-semibold text-slate-700">
              Internal Notes
            </h4>

            <button
              type="button"
              onClick={() =>
                setEditingNotes(
                  (current) => !current,
                )
              }
              className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-sky-600"
            >
              <Pencil className="size-3" />
              Edit
            </button>
          </div>

          {editingNotes ? (
            <div className="space-y-2">
              <Input
                value={notes || user.notes}
                onChange={(event) =>
                  setNotes(event.target.value)
                }
                aria-label="Internal notes"
              />

              <Button
                variant="secondary"
                onClick={() =>
                  setEditingNotes(false)
                }
              >
                Save
              </Button>
            </div>
          ) : (
            <div className="min-h-16 rounded-md bg-slate-100 px-3 py-3 text-xs text-slate-400">
              {notes || user.notes}
            </div>
          )}
        </section>

        <div className="flex items-center justify-center gap-5 border-t border-slate-100 pt-4">
          <Button
            className="min-w-24"
            onClick={() => onOnboard(user)}
          >
            Onboard
          </Button>

          <Button
            variant="danger"
            className="min-w-24"
            onClick={() => onReject(user)}
          >
            Reject
          </Button>
        </div>
      </div>
    </Modal>
  );
}