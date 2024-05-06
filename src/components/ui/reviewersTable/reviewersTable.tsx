import { ModeratorPanelReviewer } from "@/types/Reviewer";
import { type SortBy } from "@/types/Sort";
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
import { ReviewIcon } from "@/components/icons/reviewIcon";
import { MODERATOR_REVIEWERS_LIST_COLUMNS } from "@/app/moderator/reviewers/reviewers";

import { CountCell } from "../cells/countCell";
import { EtherscanLinkCell } from "../cells/etherscanLinkCell";
import { UserCell } from "../cells/userCell";

type ModeratorReviewersListColumn =
  (typeof MODERATOR_REVIEWERS_LIST_COLUMNS)[number];

export interface ModeratorReviewersSortBy extends Omit<SortBy, "sortName"> {
  sortName: ModeratorReviewersListColumn;
}

interface ReviewersTableProps {
  reviewers: ModeratorPanelReviewer[];
  sortBy: ModeratorReviewersSortBy;
  setSortBy: (sortBy: ModeratorReviewersSortBy["sortName"]) => void;
}

export const ReviewersTable = ({
  reviewers,
  sortBy,
  setSortBy,
}: ReviewersTableProps) => {
  if (reviewers.length === 0) {
    return (
      <TablePlaceholder>
        <h4 className="text-xl font-bold">No reviewers</h4>
        <p className="text-xs opacity-60">There is no reviewers yet.</p>
      </TablePlaceholder>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {MODERATOR_REVIEWERS_LIST_COLUMNS.map((column) => (
            <ReviewersListHead
              key={column}
              sortName={column}
              sortBy={sortBy}
              setSortBy={setSortBy as (sortBy: string) => void}
            />
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {reviewers.map((reviewer) => (
          <TableRow key={reviewer.id}>
            <UserCell
              name={reviewer.name}
              ethereumAddress={reviewer.ethereumAddress}
              image={reviewer.image}
            />
            <TableCell>Reviewer</TableCell>
            <CountCell count={reviewer.reviewsCount} icon={<ReviewIcon />} />
            <EtherscanLinkCell ethereumAddress={reviewer.ethereumAddress} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const ReviewersListHead = ({
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
      {getReviewersListColumn(sortName as ModeratorReviewersSortBy["sortName"])}
    </TableSortHead>
  );
};

function getReviewersListColumn(column: ModeratorReviewersListColumn) {
  switch (column) {
    case "user":
      return "User";
    case "role":
      return "Role";
    case "reviews":
      return "Reviews";
    case "address":
      return "Wallet Address";
  }
}
