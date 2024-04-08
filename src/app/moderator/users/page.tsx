import { db } from "@/drizzle/db";
import {
  Application,
  CommentValue,
  Image,
  Review,
  User,
} from "@/drizzle/schema";
import { countDistinct, eq, sql } from "drizzle-orm";

import { UserCell } from "@/components/ui/applicationsTable/cells/userCell";
import { EtherscanLink } from "@/components/ui/etherscanLink";
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

export default async function UsersPage() {
  const users = await db
    .select({
      id: User.id,
      name: User.name,
      ethereumAddress: User.ethereumAddress,
      createdAt: User.createdAt,
      image: Image,
      reviewsCount: countDistinct(Review.commentId),
      spamCount:
        sql<number>`count(case when ${CommentValue.value} = 'spam' then 1 end)`.mapWith(
          Number,
        ),
      helpfulCount:
        sql<number>`count(case when ${CommentValue.value} = 'positive' then 1 end)`.mapWith(
          Number,
        ),
      submissionsCount: countDistinct(Application.id),
    })
    .from(User)
    .leftJoin(Image, eq(Image.id, User.imageId))
    .leftJoin(Review, eq(User.id, Review.userId))
    .leftJoin(CommentValue, eq(User.id, CommentValue.userId))
    .leftJoin(Application, eq(User.id, Application.userId))
    .groupBy(User.id, Image.id);

  console.log(users);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <PageTitle>Manage</PageTitle>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Wallet address</TableHead>
            <TableHead>Reviews</TableHead>
            <TableHead>SPAM count</TableHead>
            <TableHead>Useful</TableHead>
            <TableHead>Submissions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <UserCell
                name={user.name}
                ethereumAddress={user.ethereumAddress}
                image={user.image}
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
