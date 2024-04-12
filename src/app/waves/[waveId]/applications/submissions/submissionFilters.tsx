"use client";

import { CategoryFilter, CategoryFilterProps } from "./filters/categoryFilter";

type SubmissionFiltersProps = CategoryFilterProps;

export function SubmissionFilters({
  categories,
  onCategoryChange,
}: SubmissionFiltersProps) {
  return (
    <nav className="flex flex-wrap items-center gap-x-4 gap-y-1">
      <CategoryFilter
        categories={categories}
        onCategoryChange={onCategoryChange}
      />
    </nav>
  );
}
