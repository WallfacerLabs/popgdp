"use client";

import { useState } from "react";
import { z } from "zod";

import { Application } from "@/types/Application";
import { type Category } from "@/types/Category";
import { UserId } from "@/types/User";
import { type WaveWithApplications } from "@/types/Wave";
import { useTabsSubmissions } from "@/hooks/submissions/useTabsSubmissions";
import { ApplicationsTable } from "@/components/ui/applicationsTable/applicationsTable";
import { TablePagination } from "@/components/ui/pagination/tablePagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CategoryFilterOption } from "./filters/categoryFilter";
import { SubmissionFilters } from "./submissionFilters";

const PAGE_SIZE = 10;

const searchParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
});

const SUBMISSION_TABS = {
  allSubmissions: "All Submissions",
  mySubmissions: "My Submissions",
} as const;

interface SubmissionsProps {
  wave: WaveWithApplications;
  searchParams: unknown;
  userId: UserId | undefined;
}

export function Submissions({ wave, searchParams, userId }: SubmissionsProps) {
  const { page } = searchParamsSchema.parse(searchParams);
  const categories: CategoryFilterOption[] = [
    { id: "allCategories", name: "All Categories" },
    ...wave.categories,
  ];

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilterOption["id"]>("allCategories");

  const applications = wave.applications.filter(
    (application) => application.user.isContentHidden === false,
  );

  const { allApplications, userApplications } = useTabsSubmissions({
    applications: applications,
    userId,
  });

  const [pageApplications, setPageApplications] =
    useState<Application[]>(allApplications);

  const [searchPhrase, setSearchPhrase] = useState("");

  const filteredApplications = pageApplications
    .filter(
      (application) =>
        selectedCategory === "allCategories" ||
        application.categoryId === selectedCategory,
    )
    .filter((application) =>
      application.name.toLowerCase().includes(searchPhrase.toLowerCase()),
    );

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
    setSearchPhrase(value);
  }

  return (
    <>
      <SubmissionFilters
        categories={categories}
        onCategoryChange={onCategoryChange}
        searchPhrase={searchPhrase}
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
