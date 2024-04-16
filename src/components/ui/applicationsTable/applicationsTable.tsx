import { urls } from "@/constants/urls";

import { Application } from "@/types/Application";
import {
  SUBMISSIONS_LIST_COLUMNS,
  SubmissionsListColumn,
  SubmissionsSortBy,
} from "@/hooks/submissions/useSubmissionsSortState";
import {
  Table,
  TableBody,
  TableHeader,
  TableLinkRow,
  TableRow,
  TableSortHead,
  TableSortHeadProps,
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
  sortBy: SubmissionsSortBy;
  setSortBy: (sortBy: SubmissionsSortBy["sortName"]) => void;
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
  sortBy,
  setSortBy,
}: ApplicationsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {SUBMISSIONS_LIST_COLUMNS.map((column) => (
            <SubmissionsListHead
              key={column}
              sortName={column}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
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

const SubmissionsListHead = ({
  sortName,
  sortBy,
  setSortBy,
}: TableSortHeadProps) => {
  return (
    <TableSortHead
      sortName={sortName}
      sortBy={sortBy}
      setSortBy={() => setSortBy(sortName)}
    >
      {getSubmissionsListColumn(sortName)}
    </TableSortHead>
  );
};

function getSubmissionsListColumn(column: SubmissionsListColumn) {
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
