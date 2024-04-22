import { ReactNode } from "react";

import { TableCell } from "../../table";

interface CountCellProps {
  count: number | null;
  icon: ReactNode;
  className?: string;
}

export const CountCell = ({ count, icon, className }: CountCellProps) => {
  return (
    <TableCell className={className}>
      {count ? (
        <span className="flex items-center gap-1 [&>svg]:h-4 [&>svg]:w-4">
          {icon}
          {count}
        </span>
      ) : (
        <span>-</span>
      )}
    </TableCell>
  );
};
