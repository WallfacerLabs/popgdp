"use client";

import { SearchFilter, SearchFilterProps } from "./filters/searchFilter";

type UserFiltersPanelProps = SearchFilterProps;

export function UserFiltersPanel({
  searchPhrase,
  onSearchPhraseChange,
}: UserFiltersPanelProps) {
  return (
    <nav className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
      <SearchFilter
        searchPhrase={searchPhrase}
        onSearchPhraseChange={onSearchPhraseChange}
      />
    </nav>
  );
}
