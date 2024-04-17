"use client";

import { CategoryFilter, CategoryFilterProps } from "./filters/categoryFilter";
import { SearchFilter, SearchFilterProps } from "./filters/searchFilter";

type SubmissionFiltersProps = CategoryFilterProps & SearchFilterProps;

export function SubmissionFilters({
  categories,
  onCategoryChange,
  searchPhrase,
  onSearchPhraseChange,
}: SubmissionFiltersProps) {
  return (
    <nav className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
      <CategoryFilter
        categories={categories}
        onCategoryChange={onCategoryChange}
      />
      <SearchFilter
        searchPhrase={searchPhrase}
        onSearchPhraseChange={onSearchPhraseChange}
      />
    </nav>
  );
}
