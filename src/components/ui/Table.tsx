import type {
  HTMLAttributes,
  ReactNode,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";

import { cn } from "@/src/lib/utils";

interface TableProps
  extends HTMLAttributes<HTMLTableElement> {
  children: ReactNode;
}

export function Table({
  children,
  className,
  ...props
}: TableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table
        className={cn(
          "w-full border-collapse text-left",
          className,
        )}
        {...props}
      >
        {children}
      </table>
    </div>
  );
}

interface TableHeadProps
  extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
}

export function TableHead({
  children,
  ...props
}: TableHeadProps) {
  return (
    <thead
      className="bg-slate-50"
      {...props}
    >
      {children}
    </thead>
  );
}

interface TableBodyProps
  extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
}

export function TableBody({
  children,
  ...props
}: TableBodyProps) {
  return <tbody {...props}>{children}</tbody>;
}

interface TableRowProps
  extends HTMLAttributes<HTMLTableRowElement> {
  children: ReactNode;
}

export function TableRow({
  children,
  className,
  ...props
}: TableRowProps) {
  return (
    <tr
      className={cn(
        "border-b border-slate-100 last:border-b-0 hover:bg-slate-50/70",
        className,
      )}
      {...props}
    >
      {children}
    </tr>
  );
}

interface TableHeaderCellProps
  extends ThHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
}

export function TableHeaderCell({
  children,
  className,
  ...props
}: TableHeaderCellProps) {
  return (
    <th
      className={cn(
        "px-3 py-3 text-xs font-semibold text-slate-600",
        className,
      )}
      {...props}
    >
      {children}
    </th>
  );
}

interface TableCellProps
  extends TdHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
}

export function TableCell({
  children,
  className,
  ...props
}: TableCellProps) {
  return (
    <td
      className={cn(
        "px-3 py-3 text-xs text-slate-600",
        className,
      )}
      {...props}
    >
      {children}
    </td>
  );
}