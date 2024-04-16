import { SortBy } from "@/types/Sort";
import { useSearchState } from "@/hooks/useSearchState";

const DEFAULT_SORT_BY: SubmissionsListColumn = "name";

export const SUBMISSIONS_LIST_COLUMNS = [
  "name",
  "user",
  "entity",
  "submissionDate",
  "budget",
  "category",
];

export type SubmissionsListColumn = (typeof SUBMISSIONS_LIST_COLUMNS)[number];

export interface SubmissionsSortBy extends Omit<SortBy, "sortName"> {
  sortName: SubmissionsListColumn;
}

export function useSubmissionsSortState() {
  const { searchParams, updateSearchParams } = useSearchState();

  const handleSortBy = (name: SubmissionsSortBy["sortName"]): void => {
    const descendingByDefault = name === "tvl" || name === "apy";
    const sortBy = searchParams.get("sortBy");
    const previousAsc = searchParams.get("asc") === "true";
    const asc = sortBy === name ? !previousAsc : !descendingByDefault;

    updateSearchParams(["sortBy", name], ["asc", asc.toString()]);
  };

  const asc = searchParams.get("asc") === "true";
  const sortByRaw = searchParams.get("sortBy") ?? "";
  const sortName = SUBMISSIONS_LIST_COLUMNS.includes(
    sortByRaw as SubmissionsListColumn,
  )
    ? sortByRaw
    : DEFAULT_SORT_BY;

  const sortBy = {
    sortName,
    asc,
  };

  return { handleSortBy, sortBy };
}
