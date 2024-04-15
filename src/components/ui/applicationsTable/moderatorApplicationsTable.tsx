import { ModeratorApplication } from "@/types/Application";
import { UserCell } from "@/components/ui/applicationsTable/cells/userCell";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { BudgetCell } from "./cells/budgetCell";
import { CategoryCell } from "./cells/categoryCell";
import { DateCell } from "./cells/dateCell";
import { EntityCell } from "./cells/entityCell";
import { NameCell } from "./cells/nameCell";

interface ModeratorApplicationsTableProps {
  applications: ModeratorApplication[];
}

export const ModeratorApplicationsTable = ({
  applications,
}: ModeratorApplicationsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Project name</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Entity name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Proposed budget</TableHead>
          <TableHead>Upvotes</TableHead>
          <TableHead>Spam</TableHead>
          <TableHead>Category</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.map((application) => (
          <TableRow key={application.id}>
            <NameCell name={application.name} />
            <UserCell
              name={application.user.name}
              ethereumAddress={application.user.ethereumAddress}
              image={application.userImage}
            />
            <EntityCell entityName={application.entityName} />
            <DateCell createdAt={application.createdAt} />
            <BudgetCell budget={application.budget} />
            <TableCell>{application.helpfulCount}</TableCell>
            <TableCell>{application.spamCount}</TableCell>
            <CategoryCell category={application.category} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
