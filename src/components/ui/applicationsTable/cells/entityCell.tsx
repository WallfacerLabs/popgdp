import { Application } from "@/types/Application";

import { TableCell } from "../../table";

export const EntityCell = ({ entityName }: Pick<Application, "entityName">) => {
  return (
    <TableCell>
      <span className="font-bold">{entityName}</span>
    </TableCell>
  );
};
