import { db } from "@/drizzle/db";
import { Image, Review, User } from "@/drizzle/schema";
import { eq, sql } from "drizzle-orm";

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

export default async function UsersPage() {
  const users = await db
    .select({
      id: User.id,
      name: User.name,
      ethereumAddress: User.ethereumAddress,
      createdAt: User.createdAt,
      image: Image,
      reviewsCount: sql<number>`count(${Review.commentId})`.mapWith(Number),
    })
    .from(User)
    .leftJoin(Image, eq(Image.id, User.imageId))
    .innerJoin(Review, eq(User.id, Review.userId))
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
