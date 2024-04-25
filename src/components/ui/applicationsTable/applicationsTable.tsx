import { urls } from "@/constants/urls";

import { Application } from "@/types/Application";
import { SortBy } from "@/types/Sort";
import {
  Table,
  TableBody,
  TableHeader,
  TableLinkRow,
  TablePlaceholder,
  TableRow,
  TableSortHead,
  TableSortHeadProps,
} from "@/components/ui/table";
import { SUBMISSIONS_LIST_COLUMNS } from "@/app/waves/[waveId]/applications/submissions/submissions";

import { BudgetCell } from "./cells/budgetCell";
import { CategoryCell } from "./cells/categoryCell";
import { DateCell } from "./cells/dateCell";
import { EntityCell } from "./cells/entityCell";
import { NameCell } from "./cells/nameCell";
import { UserCell } from "./cells/userCell";

type SubmissionsListColumn = (typeof SUBMISSIONS_LIST_COLUMNS)[number];

export interface SubmissionsSortBy extends Omit<SortBy, "sortName"> {
  sortName: SubmissionsListColumn;
}

interface ApplicationsTableProps {
  applications: Application[];
  waveId: number;
  sortBy: SubmissionsSortBy;
  setSortBy: (sortBy: SubmissionsSortBy["sortName"]) => void;
}

export const ApplicationsTable = ({
  applications,
  waveId,
  sortBy,
  setSortBy,
}: ApplicationsTableProps) => {
  if (applications.length === 0) {
    return (
      <TablePlaceholder>
        <h4 className="text-xl font-bold">No submissions</h4>
        <p className="text-xs opacity-60">
          There is no submissions for this wave yet.
        </p>
      </TablePlaceholder>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {SUBMISSIONS_LIST_COLUMNS.map((column) => (
            <SubmissionsListHead
              key={column}
              sortName={column}
              sortBy={sortBy}
              setSortBy={setSortBy as (sortBy: string) => void}
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
      {getSubmissionsListColumn(sortName as SubmissionsSortBy["sortName"])}
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
