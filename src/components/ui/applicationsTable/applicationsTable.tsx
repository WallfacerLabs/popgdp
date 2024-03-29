import { formatDate } from "@/lib/dates";
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
import { Application } from "@/app/types/Application";

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
            <TableCell>
              <span className="font-bold">{application.name}</span>
            </TableCell>
            <TableCell>{application.user.name}</TableCell>
            <TableCell>{application.entityName}</TableCell>
            <TableCell>
              <span className="opacity-60">
                {formatDate(application.createdAt)}
              </span>
            </TableCell>
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
