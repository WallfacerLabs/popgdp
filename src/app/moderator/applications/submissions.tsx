"use client";

import { getFilteredSubmissions } from "@/utils/getFilteredSubmissions";

import { ModeratorApplication } from "@/types/Application";
import { useSubmissionsSearchState } from "@/hooks/useSubmissionsSearchState";
import { ModeratorApplicationsTable } from "@/components/ui/applicationsTable/moderatorApplicationsTable";
import { CategoryFilterOption } from "@/components/ui/filterPanels/filters/categoryFilter";
import { SubmissionFiltersPanel } from "@/components/ui/filterPanels/submissionFiltersPanel";
import { TablePagination } from "@/components/ui/pagination/tablePagination";

const PAGE_SIZE = 10;

interface SubmissionsProps {
  applications: ModeratorApplication[];
}

export function Submissions({ applications }: SubmissionsProps) {
  const { page, search, category, onCategoryChange, onSearchPhraseChange } =
    useSubmissionsSearchState();

  const applicationCategories = Array.from(
    new Set(applications.map((application) => application.category)),
  );

  const categories: CategoryFilterOption[] = [
    { id: "all", name: "All Categories" },
    ...applicationCategories,
  ];

  const filteredApplications = getFilteredSubmissions({
    applications,
    category,
    search,
  });

  const applicationsCount = filteredApplications.length;
  const totalPages = Math.ceil(applicationsCount / PAGE_SIZE);

  const currentPageApplications = filteredApplications.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  return (
    <>
      <SubmissionFiltersPanel
        categories={categories}
        onCategoryChange={onCategoryChange}
        searchPhrase={search}
        onSearchPhraseChange={onSearchPhraseChange}
      />
      <ModeratorApplicationsTable applications={currentPageApplications} />
      {totalPages > 1 && (
        <TablePagination currentPage={page} totalPages={totalPages} />
      )}
    </>
  );
}
