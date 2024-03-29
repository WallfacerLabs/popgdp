import { Application } from "@/app/types/Application";

import { TableCell } from "../../table";

export const UserCell = ({ user }: Pick<Application, "user">) => {
  return (
    <TableCell>
      <span className="font-bold">{user.name}</span>
    </TableCell>
  );
};
