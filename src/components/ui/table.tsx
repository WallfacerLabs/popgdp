import {
  forwardRef,
  type ComponentProps,
  type HTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from "react";
import Link from "next/link";

import { cn } from "@/lib/cn";

const Table = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative table w-full caption-bottom overflow-auto rounded-2xl border text-xs",
        className,
      )}
      {...props}
    />
  ),
);
Table.displayName = "Table";

const TableHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("table-header-group", className)} {...props} />
  ),
);
TableHeader.displayName = "TableHeader";

const TableBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("table-row-group", className)} {...props} />
  ),
);
TableBody.displayName = "TableBody";

const rowClasses =
  "group table-row transition-colors data-[state=selected]:bg-muted";

const TableRow = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(rowClasses, className)} {...props} />
  ),
);
TableRow.displayName = "TableRow";

const TableLinkRow = forwardRef<HTMLDivElement, ComponentProps<typeof Link>>(
  ({ className, children, ...props }, ref) => (
    <TableRow
      ref={ref}
      className={cn(
        rowClasses,
        "relative focus-within:z-10 [&>.table-cell>*]:relative [&>.table-cell>*]:z-10 [&>.table-cell>*]:w-fit",
        className,
      )}
    >
      {children}
      <Link
        className={cn(
          "absolute inset-0 h-full w-full rounded transition-colors group-last:rounded-b-2xl",
          "hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0",
        )}
        {...props}
      />
    </TableRow>
  ),
);
TableLinkRow.displayName = "TableLinkRow";

const TableHead = forwardRef<HTMLDivElement, ThHTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "table-cell h-12 px-4 text-left align-middle font-semibold capitalize [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  ),
);
TableHead.displayName = "TableHead";

const TableCell = forwardRef<HTMLDivElement, TdHTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "table-cell border-t p-4 align-middle [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  ),
);
TableCell.displayName = "TableCell";

export {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableLinkRow,
  TableRow,
};
