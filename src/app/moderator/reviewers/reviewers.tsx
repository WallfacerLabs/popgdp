"use client";

import { MAX_ITEMS_PER_PAGE } from "@/constants/pagination";
import { getFilteredReviewers } from "@/utils/getFilteredReviewers";

import { ModeratorPanelReviewer } from "@/types/Reviewer";
import { sortObjectsByKey } from "@/lib/sort";
import { useReviewersSearchState } from "@/hooks/useReviewersSearchState";
import { useSortState } from "@/hooks/useSortState";
import { UserFiltersPanel } from "@/components/ui/filterPanels/userFiltersPanel";
import { TablePagination } from "@/components/ui/pagination/tablePagination";
import {
  ModeratorReviewersSortBy,
  ReviewersTable,
} from "@/components/ui/reviewersTable/reviewersTable";

export const MODERATOR_REVIEWERS_LIST_COLUMNS = [
  "user",
  "role",
  "reviews",
  "address",
] as const;

interface ReviewersProps {
  reviewers: ModeratorPanelReviewer[];
}

export function Reviewers({ reviewers }: ReviewersProps) {
  const { page, search, onSearchPhraseChange } = useReviewersSearchState();

  const { sortBy, handleSortBy } = useSortState({
    columns: MODERATOR_REVIEWERS_LIST_COLUMNS,
    defaultDescendingColumns: ["reviews"],
  });

  const sortedReviewers = getModeratorSortedReviewers({
    reviewers,
    sortBy,
  });

  const filteredReviewers = getFilteredReviewers({
    reviewers: sortedReviewers,
    search,
  });

  const reviewersCount = filteredReviewers.length;
  const totalPages = Math.ceil(reviewersCount / MAX_ITEMS_PER_PAGE);

  const currentPageReviewers = filteredReviewers.slice(
    (page - 1) * MAX_ITEMS_PER_PAGE,
    page * MAX_ITEMS_PER_PAGE,
  );

  return (
    <>
      <UserFiltersPanel
        searchPhrase={search}
        onSearchPhraseChange={onSearchPhraseChange}
      />

      <ReviewersTable
        reviewers={currentPageReviewers}
        sortBy={sortBy}
        setSortBy={handleSortBy}
      />

      {totalPages > 1 && (
        <TablePagination currentPage={page} totalPages={totalPages} />
      )}
    </>
  );
}

function getModeratorSortedReviewers({
  reviewers,
  sortBy,
}: {
  reviewers: ModeratorPanelReviewer[];
  sortBy: ModeratorReviewersSortBy;
}) {
  switch (sortBy.sortName) {
    case "user":
    default:
      return sortObjectsByKey(reviewers, ["name"], sortBy.asc);
    case "address":
      return sortObjectsByKey(reviewers, ["ethereumAddress"], sortBy.asc);
    case "reviews":
      return sortObjectsByKey(reviewers, ["reviewsCount"], sortBy.asc);
    case "address":
      return sortObjectsByKey(reviewers, ["ethereumAddress"], sortBy.asc);
  }
}
