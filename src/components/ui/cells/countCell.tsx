import { type ReactNode } from "react";

import { TableCell } from "../table";

interface CountCellProps {
  count: number | null;
  icon: ReactNode;
}

export const CountCell = ({ count, icon }: CountCellProps) => {
  return (
    <TableCell>
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
