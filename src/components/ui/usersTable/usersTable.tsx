import { type SortBy } from "@/types/Sort";
import { type ModeratorPanelUser } from "@/types/User";
import { UserCell } from "@/components/ui/applicationsTable/cells/userCell";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TablePlaceholder,
  TableRow,
  TableSortHead,
  TableSortHeadProps,
} from "@/components/ui/table";
import { AssignmentIcon } from "@/components/icons/assignmentIcon";
import { ErrorCircleIcon } from "@/components/icons/errorCircleIcon";
import { ReviewIcon } from "@/components/icons/reviewIcon";
import { ThumbUpIcon } from "@/components/icons/thumbUpIcon";
import { MODERATOR_USERS_LIST_COLUMNS } from "@/app/moderator/users/users";

import { CountCell } from "./cells/countCell";
import { EtherscanLinkCell } from "./cells/etherscanLinkCell";
import { UserActionsCell } from "./cells/userActionsCell";

type ModeratorUsersListColumn = (typeof MODERATOR_USERS_LIST_COLUMNS)[number];

export interface ModeratorUsersSortBy extends Omit<SortBy, "sortName"> {
  sortName: ModeratorUsersListColumn;
}

interface UsersTableProps {
  users: ModeratorPanelUser[];
  sortBy: ModeratorUsersSortBy;
  setSortBy: (sortBy: ModeratorUsersSortBy["sortName"]) => void;
}

export const UsersTable = ({ users, sortBy, setSortBy }: UsersTableProps) => {
  if (users.length === 0) {
    return (
      <TablePlaceholder>
        <h4 className="text-xl font-bold">No users</h4>
        <p className="text-xs opacity-60">There are no users yet.</p>
      </TablePlaceholder>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {MODERATOR_USERS_LIST_COLUMNS.map((column) => (
            <UsersListHead
              key={column}
              sortName={column}
              sortBy={sortBy}
              setSortBy={setSortBy as (sortBy: string) => void}
            />
          ))}
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <UserCell
              name={user.name}
              ethereumAddress={user.ethereumAddress}
              image={user.image}
              isBlocked={user.isBlocked}
              blockedBadgeText={
                user.isContentHidden ? "Blocked and hidden" : "Blocked"
              }
            />
            <EtherscanLinkCell ethereumAddress={user.ethereumAddress} />
            <CountCell count={user.reviewsCount} icon={<ReviewIcon />} />
            <CountCell count={user.spamCount} icon={<ErrorCircleIcon />} />
            <CountCell count={user.helpfulCount} icon={<ThumbUpIcon />} />
            <CountCell
              count={user.submissionsCount}
              icon={<AssignmentIcon />}
            />
            <UserActionsCell user={user} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const UsersListHead = ({ sortName, sortBy, setSortBy }: TableSortHeadProps) => {
  return (
    <TableSortHead
      sortName={sortName}
      sortBy={sortBy}
      setSortBy={() => setSortBy(sortName)}
    >
      {getUsersListColumn(sortName as ModeratorUsersSortBy["sortName"])}
    </TableSortHead>
  );
};

function getUsersListColumn(column: ModeratorUsersListColumn) {
  switch (column) {
    case "user":
      return "User";
    case "address":
      return "Wallet Address";
    case "reviews":
      return "Reviews";
    case "spam":
      return "SPAM count";
    case "useful":
      return "Useful";
    case "submissions":
      return "Submissions";
  }
}
