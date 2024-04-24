import { type ModeratorPanelUser } from "@/types/User";
import { BlockUserButton } from "@/app/moderator/users/blockUserButton/blockUserButton";

import { TableCell } from "../../table";

interface UserActionsCellProps {
  user: ModeratorPanelUser;
}

export const UserActionsCell = ({ user }: UserActionsCellProps) => {
  return (
    <TableCell>
      <BlockUserButton user={user} />
    </TableCell>
  );
};
