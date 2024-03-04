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
        "relative table w-full caption-bottom overflow-auto rounded-lg border text-xs",
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
  "table-row border-black transition-colors data-[state=selected]:bg-muted";

const TableRow = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div className={cn(rowClasses, className)} {...props} />
  ),
);
TableRow.displayName = "TableLinkRow";

const TableLinkRow = forwardRef<HTMLAnchorElement, ComponentProps<typeof Link>>(
  ({ className, ...props }, ref) => (
    <Link ref={ref} className={cn(rowClasses, "hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 last:rounded-b-lg", className)} {...props} />
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
        "table-cell p-4 align-middle [&:has([role=checkbox])]:pr-0 border-t",
        className,
      )}
      {...props}
    />
  ),
);
TableCell.displayName = "TableCell";

export {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableLinkRow,
  TableCell,
};
