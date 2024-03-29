import { Application } from "@/types/Application";
import { formatDate } from "@/lib/dates";

import { TableCell } from "../../table";

export const DateCell = ({ createdAt }: Pick<Application, "createdAt">) => {
  return (
    <TableCell>
      <span className="opacity-60">{formatDate(createdAt)}</span>
    </TableCell>
  );
};
