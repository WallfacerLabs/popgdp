import { Application } from "@/types/Application";
import { CategoryBadge } from "@/components/ui/categories/categoryBadge";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableLinkRow,
  TableRow,
} from "@/components/ui/table";

import { BudgetCell } from "./cells/budgetCell";
import { DateCell } from "./cells/dateCell";
import { EntityCell } from "./cells/entityCell";
import { NameCell } from "./cells/nameCell";
import { UserCell } from "./cells/userCell";

interface ApplicationsTableProps {
  applications: Application[];
  waveId: number;
}

export const ApplicationsTable = ({
  applications,
  waveId,
}: ApplicationsTableProps) => {
  return (
    <Table className="mt-8">
      <TableHeader>
        <TableRow>
          <TableHead>Project name</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Entity name</TableHead>
          <TableHead>Submitted</TableHead>
          <TableHead>Proposed budget</TableHead>
          <TableHead>Category</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.map((application) => (
          <TableLinkRow
            key={application.id}
            href={`/waves/${waveId}/applications/${application.id}`}
          >
            <NameCell name={application.name} />
            <UserCell user={application.user} />
            <EntityCell entityName={application.entityName} />
            <DateCell createdAt={application.createdAt} />
            <BudgetCell budget={application.budget} />
            <CategoryBadge category={application.category} />
          </TableLinkRow>
        ))}
      </TableBody>
    </Table>
  );
};
