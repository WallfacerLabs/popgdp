"use client";

import { MAX_ITEMS_PER_PAGE } from "@/constants/pagination";
import { getFilteredSubmissions } from "@/utils/getFilteredSubmissions";

import { ModeratorApplication } from "@/types/Application";
import { sortObjectsByKey } from "@/lib/sort";
import { useSortState } from "@/hooks/useSortState";
import { useSubmissionsSearchState } from "@/hooks/useSubmissionsSearchState";
import {
  ModeratorApplicationsTable,
  type ModeratorSubmissionsSortBy,
} from "@/components/ui/applicationsTable/moderatorApplicationsTable";
import { CategoryFilterOption } from "@/components/ui/filterPanels/filters/categoryFilter";
import { SubmissionFiltersPanel } from "@/components/ui/filterPanels/submissionFiltersPanel";
import { TablePagination } from "@/components/ui/pagination/tablePagination";

export const MODERATOR_SUBMISSIONS_LIST_COLUMNS = [
  "name",
  "user",
  "entity",
  "submissionDate",
  "budget",
  "upvotes",
  "invalid",
  "category",
] as const;

interface SubmissionsProps {
  applications: ModeratorApplication[];
}

export function Submissions({ applications }: SubmissionsProps) {
  const { page, search, category, onCategoryChange, onSearchPhraseChange } =
    useSubmissionsSearchState();

  const { sortBy, handleSortBy } = useSortState({
    columns: MODERATOR_SUBMISSIONS_LIST_COLUMNS,
    defaultDescendingColumns: [
      "submissionDate",
      "upvotes",
      "invalid",
      "budget",
    ],
  });

  const applicationCategories = Array.from(
    new Set(applications.map((application) => application.category)),
  );

  const categories: CategoryFilterOption[] = [
    { id: "all", name: "All Categories" },
    ...applicationCategories,
  ];

  const sortedApplications = getModeratorSortedSubmissions({
    applications,
    sortBy,
  });

  const filteredApplications = getFilteredSubmissions({
    applications: sortedApplications,
    category,
    search,
  });

  const applicationsCount = filteredApplications.length;
  const totalPages = Math.ceil(applicationsCount / MAX_ITEMS_PER_PAGE);

  const currentPageApplications = filteredApplications.slice(
    (page - 1) * MAX_ITEMS_PER_PAGE,
    page * MAX_ITEMS_PER_PAGE,
  );

  return (
    <>
      <SubmissionFiltersPanel
        categories={categories}
        onCategoryChange={onCategoryChange}
        searchPhrase={search}
        onSearchPhraseChange={onSearchPhraseChange}
      />
      <ModeratorApplicationsTable
        applications={currentPageApplications}
        sortBy={sortBy}
        setSortBy={handleSortBy}
      />
      {totalPages > 1 && (
        <TablePagination currentPage={page} totalPages={totalPages} />
      )}
    </>
  );
}

export function getModeratorSortedSubmissions({
  applications,
  sortBy,
}: {
  applications: ModeratorApplication[];
  sortBy: ModeratorSubmissionsSortBy;
}) {
  switch (sortBy.sortName) {
    case "name":
    default:
      return sortObjectsByKey(applications, ["name"], sortBy.asc);
    case "user":
      return sortObjectsByKey(applications, ["user", "name"], sortBy.asc);
    case "entity":
      return sortObjectsByKey(applications, ["entityName"], sortBy.asc);
    case "submissionDate":
      return sortObjectsByKey(applications, ["createdAt"], sortBy.asc);
    case "budget":
      return sortObjectsByKey(applications, ["budget"], sortBy.asc);
    case "upvotes":
      return sortObjectsByKey(applications, ["helpfulCount"], sortBy.asc);
    case "invalid":
      return sortObjectsByKey(applications, ["invalidCount"], sortBy.asc);
    case "category":
      return sortObjectsByKey(applications, ["category", "name"], sortBy.asc);
  }
}
