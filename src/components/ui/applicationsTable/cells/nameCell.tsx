import { Application } from "@/types/Application";

import { TableCell } from "../../table";

export const NameCell = ({ name }: Pick<Application, "name">) => {
  return (
    <TableCell>
      <span className="font-bold">{name}</span>
    </TableCell>
  );
};
