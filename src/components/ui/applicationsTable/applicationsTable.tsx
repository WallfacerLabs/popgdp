import { Application } from "@/types/Application";
import { CategoryBadge } from "@/components/ui/categories/categoryBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableLinkRow,
  TableRow,
} from "@/components/ui/table";
import { WldAmount } from "@/components/ui/wldAmount";

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
            <TableCell>
              <WldAmount amount={application.budget} />
            </TableCell>
            <TableCell>
              <CategoryBadge category={application.category} />
            </TableCell>
          </TableLinkRow>
        ))}
      </TableBody>
    </Table>
  );
};
