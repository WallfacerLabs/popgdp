"use client";

import { useState } from "react";
import { getFilteredSubmissions } from "@/utils/getFilteredSubmissions";
import { getTabsSubmissions } from "@/utils/getTabsSubmissions";

import { Application } from "@/types/Application";
import { UserId } from "@/types/User";
import { type WaveWithApplications } from "@/types/Wave";
import { useSubmissionsSearchState } from "@/hooks/useSubmissionsSearchState";
import { ApplicationsTable } from "@/components/ui/applicationsTable/applicationsTable";
import { CategoryFilterOption } from "@/components/ui/filterPanels/filters/categoryFilter";
import { SubmissionFiltersPanel } from "@/components/ui/filterPanels/submissionFiltersPanel";
import { TablePagination } from "@/components/ui/pagination/tablePagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MAX_APPLICATIONS_PER_PAGE = 10;

const SUBMISSION_TABS = {
  allSubmissions: "All Submissions",
  mySubmissions: "My Submissions",
} as const;

interface SubmissionsProps {
  wave: WaveWithApplications;
  userId: UserId | undefined;
}

export function Submissions({ wave, userId }: SubmissionsProps) {
  const { page, search, category, onCategoryChange, onSearchPhraseChange } =
    useSubmissionsSearchState();

  const categories: CategoryFilterOption[] = [
    { id: "all", name: "All Categories" },
    ...wave.categories,
  ];

  const applications = wave.applications.filter(
    (application) => application.user.isContentHidden === false,
  );

  const { allApplications, userApplications } = getTabsSubmissions({
    applications: applications,
    userId,
  });

  const [pageApplications, setPageApplications] =
    useState<Application[]>(allApplications);

  const filteredApplications = getFilteredSubmissions({
    applications: pageApplications,
    category,
    search,
  });

  const applicationsCount = filteredApplications.length;
  const totalPages = Math.ceil(applicationsCount / MAX_APPLICATIONS_PER_PAGE);

  const currentPageApplications = filteredApplications.slice(
    (page - 1) * MAX_APPLICATIONS_PER_PAGE,
    page * MAX_APPLICATIONS_PER_PAGE,
  );

  function onTabChange(value: string) {
    setPageApplications(
      value === SUBMISSION_TABS.allSubmissions
        ? allApplications
        : userApplications,
    );
  }

  return (
    <>
      <SubmissionFiltersPanel
        categories={categories}
        onCategoryChange={onCategoryChange}
        searchPhrase={search}
        onSearchPhraseChange={onSearchPhraseChange}
      />

      <Tabs
        defaultValue={SUBMISSION_TABS.allSubmissions}
        onValueChange={onTabChange}
      >
        <TabsList className="ml-4">
          <TabsTrigger value={SUBMISSION_TABS.allSubmissions}>
            {SUBMISSION_TABS.allSubmissions}
          </TabsTrigger>
          <TabsTrigger value={SUBMISSION_TABS.mySubmissions}>
            {SUBMISSION_TABS.mySubmissions}
          </TabsTrigger>
        </TabsList>

        <TabsContent value={SUBMISSION_TABS.allSubmissions}>
          <ApplicationsTable
            applications={currentPageApplications}
            waveId={wave.id}
          />
        </TabsContent>

        <TabsContent value={SUBMISSION_TABS.mySubmissions}>
          <ApplicationsTable
            applications={currentPageApplications}
            waveId={wave.id}
          />
        </TabsContent>
      </Tabs>

      {totalPages > 1 && (
        <TablePagination currentPage={page} totalPages={totalPages} />
      )}
    </>
  );
}
