import { urls } from "@/constants/urls";

import { Application } from "@/types/Application";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableLinkRow,
  TableRow,
} from "@/components/ui/table";

import { BudgetCell } from "./cells/budgetCell";
import { CategoryCell } from "./cells/categoryCell";
import { DateCell } from "./cells/dateCell";
import { EntityCell } from "./cells/entityCell";
import { NameCell } from "./cells/nameCell";
import { UserCell } from "./cells/userCell";

interface ApplicationsTableProps {
  applications: Application[];
  waveId: number;
  className?: string;
}

const SUBMISSIONS_LIST_COLUMNS = [
  "name",
  "user",
  "entity",
  "submissionDate",
  "budget",
  "category",
] as const;

export const ApplicationsTable = ({
  applications,
  waveId,
  className,
}: ApplicationsTableProps) => {
  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          {SUBMISSIONS_LIST_COLUMNS.map((column) => (
            <SubmissionsListColumn key={column} column={column} />
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.map((application) => (
          <TableLinkRow
            key={application.id}
            href={urls.applications.preview({
              waveId,
              applicationId: application.id,
            })}
          >
            <NameCell name={application.name} draft={application.draft} />
            <UserCell {...application.user} />
            <EntityCell entityName={application.entityName} />
            <DateCell createdAt={application.createdAt} />
            <BudgetCell budget={application.budget} />
            <CategoryCell category={application.category} />
          </TableLinkRow>
        ))}
      </TableBody>
    </Table>
  );
};

type SubmissionsListColumnKey = (typeof SUBMISSIONS_LIST_COLUMNS)[number];

interface SubmissionsListColumnProps {
  column: SubmissionsListColumnKey;
}

const SubmissionsListColumn = ({ column }: SubmissionsListColumnProps) => {
  return <TableHead>{getSubmissionsListColumn(column)}</TableHead>;
};

function getSubmissionsListColumn(column: SubmissionsListColumnKey) {
  switch (column) {
    case "name":
      return "Project name";
    case "user":
      return "User";
    case "entity":
      return "Entity name";
    case "submissionDate":
      return "Submitted";
    case "budget":
      return "Proposed budget";
    case "category":
      return "Category";
  }
}
