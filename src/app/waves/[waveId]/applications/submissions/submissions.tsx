"use client";

import { useState } from "react";
import { z } from "zod";

import { type Category } from "@/types/Category";
import { type WaveWithApplications } from "@/types/Wave";
import { ApplicationsTable } from "@/components/ui/applicationsTable/applicationsTable";
import { TablePagination } from "@/components/ui/pagination/tablePagination";

import { CategoryFilterOption, SubmissionFilters } from "./submissionFilters";

const PAGE_SIZE = 10;

const searchParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
});

interface SubmissionsProps {
  wave: WaveWithApplications;
  searchParams: unknown;
}

export function Submissions({ wave, searchParams }: SubmissionsProps) {
  const { page } = searchParamsSchema.parse(searchParams);
  const categories: CategoryFilterOption[] = [
    { id: "allCategories", name: "All Categories" },
    ...wave.categories,
  ];

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilterOption["id"]>("allCategories");

  const applications = wave.applications;

  const filteredApplications =
    selectedCategory !== "allCategories"
      ? applications.filter(
          (application) => application.categoryId === selectedCategory,
        )
      : applications;

  const applicationsCount = filteredApplications.length;
  const totalPages = Math.ceil(applicationsCount / PAGE_SIZE);

  const currentPageApplications = filteredApplications.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  function onCategoryChange(value: Category["id"]) {
    setSelectedCategory(value);
  }

  return (
    <>
      <SubmissionFilters
        categories={categories}
        onCategoryChange={onCategoryChange}
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
