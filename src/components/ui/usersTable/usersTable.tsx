import { ModeratorPanelUser } from "@/types/User";
import { UserCell } from "@/components/ui/applicationsTable/cells/userCell";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AssignmentIcon } from "@/components/icons/assignmentIcon";
import { ErrorCircleIcon } from "@/components/icons/errorCircleIcon";
import { ReviewIcon } from "@/components/icons/reviewIcon";
import { ThumbUpIcon } from "@/components/icons/thumbUpIcon";

import { CountCell } from "./cells/countCell";
import { EtherscanLinkCell } from "./cells/etherscanLinkCell";
import { UserActionsCell } from "./cells/userActionsCell";

interface UsersTableProps {
  users: ModeratorPanelUser[];
}

export const UsersTable = ({ users }: UsersTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Wallet address</TableHead>
          <TableHead>Reviews</TableHead>
          <TableHead>SPAM count</TableHead>
          <TableHead>Useful</TableHead>
          <TableHead>Submissions</TableHead>
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
              className="text-red"
            />
            <UserActionsCell user={user} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
