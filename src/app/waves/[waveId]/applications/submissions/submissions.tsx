"use client";

import { useState } from "react";
import { getFilteredSubmissions } from "@/utils/getFilteredSubmissions";

import { Application } from "@/types/Application";
import { type Category } from "@/types/Category";
import { UserId } from "@/types/User";
import { type WaveWithApplications } from "@/types/Wave";
import { useTabsSubmissions } from "@/hooks/submissions/useTabsSubmissions";
import { useSearchState } from "@/hooks/useSearchState";
import { ApplicationsTable } from "@/components/ui/applicationsTable/applicationsTable";
import { TablePagination } from "@/components/ui/pagination/tablePagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CategoryFilterOption } from "./filters/categoryFilter";
import { SubmissionFilters } from "./submissionFilters";

const PAGE_SIZE = 10;

const SUBMISSION_TABS = {
  allSubmissions: "All Submissions",
  mySubmissions: "My Submissions",
} as const;

interface SubmissionsProps {
  wave: WaveWithApplications;
  userId: UserId | undefined;
}

export function Submissions({ wave, userId }: SubmissionsProps) {
  const { searchParams, updateSearchParams } = useSearchState();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const search = searchParams.get("search") ?? "";

  const categories: CategoryFilterOption[] = [
    { id: "all", name: "All Categories" },
    ...wave.categories,
  ];

  const [selectedCategory, setSelectedCategory] = useState<
    CategoryFilterOption["id"] | undefined
  >();

  const [searchPhrase, setSearchPhrase] = useState("");

  const applications = wave.applications.filter(
    (application) => application.user.isContentHidden === false,
  );

  const { allApplications, userApplications } = useTabsSubmissions({
    applications: applications,
    userId,
  });

  const [pageApplications, setPageApplications] =
    useState<Application[]>(allApplications);

  const filteredApplications = getFilteredSubmissions({
    applications: pageApplications,
    category: selectedCategory,
    search,
  });

  const applicationsCount = filteredApplications.length;
  const totalPages = Math.ceil(applicationsCount / PAGE_SIZE);

  const currentPageApplications = filteredApplications.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  function onCategoryChange(value: Category["id"]) {
    setSelectedCategory(value);
  }

  function onTabChange(value: string) {
    setPageApplications(
      value === SUBMISSION_TABS.allSubmissions
        ? allApplications
        : userApplications,
    );
  }

  function onSearchPhraseChange(value: string) {
    updateSearchParams("search", value);
  }

  return (
    <>
      <SubmissionFilters
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
