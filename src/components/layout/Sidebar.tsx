import { UserRound } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="hidden w-52 shrink-0 border-r border-slate-200/75 bg-white lg:block">
      <div className="flex h-full min-h-screen flex-col">
        <div className="flex h-16 items-center px-5">
          <div className="text-base font-bold tracking-tight text-sky-600">
            gler
            <span className="text-[10px] font-normal">
              ®
            </span>
          </div>

          <span className="ml-1 text-xs font-medium text-slate-500">
            Admin Panel
          </span>
        </div>

        <nav className="px-3">
          <div className="flex items-center gap-2 rounded-md bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">
            <UserRound className="size-3.5" />
            User Management
          </div>
        </nav>
      </div>
    </aside>
  );
}