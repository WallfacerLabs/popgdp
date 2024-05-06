import { ModeratorApplication } from "@/types/Application";
import { type SortBy } from "@/types/Sort";
import { UserCell } from "@/components/ui/applicationsTable/cells/userCell";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TablePlaceholder,
  TableRow,
  TableSortHead,
  TableSortHeadProps,
} from "@/components/ui/table";
import { MODERATOR_SUBMISSIONS_LIST_COLUMNS } from "@/app/moderator/applications/submissions";

import { BudgetCell } from "./cells/budgetCell";
import { CategoryCell } from "./cells/categoryCell";
import { DateCell } from "./cells/dateCell";
import { EntityCell } from "./cells/entityCell";
import { NameCell } from "./cells/nameCell";

type ModeratorSubmissionsListColumn =
  (typeof MODERATOR_SUBMISSIONS_LIST_COLUMNS)[number];

export interface ModeratorSubmissionsSortBy extends Omit<SortBy, "sortName"> {
  sortName: ModeratorSubmissionsListColumn;
}

interface ModeratorApplicationsTableProps {
  applications: ModeratorApplication[];
  sortBy: ModeratorSubmissionsSortBy;
  setSortBy: (sortBy: ModeratorSubmissionsSortBy["sortName"]) => void;
}

export const ModeratorApplicationsTable = ({
  applications,
  sortBy,
  setSortBy,
}: ModeratorApplicationsTableProps) => {
  if (applications.length === 0) {
    return (
      <TablePlaceholder>
        <h4 className="text-xl font-bold">No submissions</h4>
        <p className="text-xs opacity-60">There are no submissions yet.</p>
      </TablePlaceholder>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {MODERATOR_SUBMISSIONS_LIST_COLUMNS.map((column) => (
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
      {getSubmissionsListColumn(
        sortName as ModeratorSubmissionsSortBy["sortName"],
      )}
    </TableSortHead>
  );
};

function getSubmissionsListColumn(column: ModeratorSubmissionsListColumn) {
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
    case "upvotes":
      return "Upvotes";
    case "spam":
      return "Spam";
    case "category":
      return "Category";
  }
}
