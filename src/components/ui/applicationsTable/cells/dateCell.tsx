import { formatDate } from "@/lib/dates";
import { Application } from "@/app/types/Application";

import { TableCell } from "../../table";

export const DateCell = ({ createdAt }: Pick<Application, "createdAt">) => {
  return (
    <TableCell>
      <span className="opacity-60">{formatDate(createdAt)}</span>
    </TableCell>
  );
};
