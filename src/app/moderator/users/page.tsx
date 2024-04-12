import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getModeratorPanelUsers } from "@/drizzle/queries/user";

import { userHasRole, UserPermission } from "@/config/userPermissions";
import { UserCell } from "@/components/ui/applicationsTable/cells/userCell";
import { EtherscanLink } from "@/components/ui/etherscanLink";
import { ModeratorNavigation } from "@/components/ui/moderatorNavigation";
import { PageTitle } from "@/components/ui/pageTitle";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AssignmentIcon } from "@/components/icons/assignmentIcon";
import { ErrorCircleIcon } from "@/components/icons/errorCircleIcon";
import { ThumbUpIcon } from "@/components/icons/thumbUpIcon";

import { BlockUserButton } from "./blockUserButton/blockUserButton";
import { ExportUsers } from "./exportUsers";

export const metadata: Metadata = {
  title: "Users",
};

export default async function UsersPage() {
  const isModerator = await userHasRole(UserPermission.moderator);
  if (!isModerator) {
    throw notFound();
  }

  const users = await getModeratorPanelUsers();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <PageTitle>Manage</PageTitle>

        <ExportUsers />
      </div>

      <ModeratorNavigation />

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
              <TableCell>
                {user.ethereumAddress ? (
                  <EtherscanLink ethereumAddress={user.ethereumAddress} />
                ) : (
                  <span>-</span>
                )}
              </TableCell>
              <TableCell>
                <span>{user.reviewsCount ?? "-"}</span>
              </TableCell>
              <TableCell>
                {user.spamCount ? (
                  <span className="flex items-center gap-1 text-red">
                    <ErrorCircleIcon className="h-4 w-4" />
                    {user.spamCount}
                  </span>
                ) : (
                  <span>-</span>
                )}
              </TableCell>
              <TableCell>
                <span className="flex items-center gap-1">
                  {user.helpfulCount ? (
                    <>
                      <ThumbUpIcon className="h-4 w-4" />
                      {user.helpfulCount}
                    </>
                  ) : (
                    "-"
                  )}
                </span>
              </TableCell>
              <TableCell>
                <span className="flex items-center gap-1">
                  {user.submissionsCount ? (
                    <>
                      <AssignmentIcon className="h-4 w-4" />
                      {user.submissionsCount}
                    </>
                  ) : (
                    "-"
                  )}
                </span>
              </TableCell>
              <TableCell>
                <BlockUserButton user={user} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
