"use client";

import { useState } from "react";

import { type Category } from "@/types/Category";
import { type WaveWithApplications } from "@/types/Wave";
import { useSearchState } from "@/hooks/useSearchState";
import { ApplicationsTable } from "@/components/ui/applicationsTable/applicationsTable";
import { TablePagination } from "@/components/ui/pagination/tablePagination";

import { CategoryFilterOption } from "./filters/categoryFilter";
import { SubmissionFilters } from "./submissionFilters";

const PAGE_SIZE = 10;

interface SubmissionsProps {
  wave: WaveWithApplications;
}

export function Submissions({ wave }: SubmissionsProps) {
  const { searchParams, updateSearchParams } = useSearchState();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const search = searchParams.get("search") ?? "";

  const categories: CategoryFilterOption[] = [
    { id: "allCategories", name: "All Categories" },
    ...wave.categories,
  ];

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilterOption["id"]>("allCategories");

  const applications = wave.applications.filter(
    (application) => application.user.isContentHidden === false,
  );

  const filteredApplications = applications
    .filter(
      (application) =>
        selectedCategory === "allCategories" ||
        application.categoryId === selectedCategory,
    )
    .filter((application) =>
      application.name.toLowerCase().includes(search.toLowerCase()),
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

      <ApplicationsTable
        applications={currentPageApplications}
        waveId={wave.id}
      />

      {totalPages > 1 && (
        <TablePagination currentPage={page} totalPages={totalPages} />
      )}
    </>
  );
}
