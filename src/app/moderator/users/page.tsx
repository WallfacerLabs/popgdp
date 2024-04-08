import { db } from "@/drizzle/db";
import { Image, User } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

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
    })
    .from(User)
    .leftJoin(Image, eq(Image.id, User.imageId));

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
                  <span>–</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
