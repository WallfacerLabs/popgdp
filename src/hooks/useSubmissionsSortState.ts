import { SortBy } from "@/types/Sort";
import { useSearchState } from "@/hooks/useSearchState";

interface SubmissionsSortStateProps<T> {
  columns: T[];
  defaultDescendingColumns?: T[];
}

interface SubmissionsSortBy<T> extends Omit<SortBy, "sortName"> {
  sortName: T;
}

export function useSubmissionsSortState<T extends string>({
  columns,
  defaultDescendingColumns,
}: SubmissionsSortStateProps<T>) {
  const { searchParams, updateSearchParams } = useSearchState();

  const handleSortBy = (name: SubmissionsSortBy<T>["sortName"]): void => {
    const descendingByDefault =
      defaultDescendingColumns && defaultDescendingColumns.includes(name);
    const sortBy = searchParams.get("sortBy");
    const previousAsc = searchParams.get("asc") === "true";
    const asc = sortBy === name ? !previousAsc : !descendingByDefault;

    updateSearchParams(["sortBy", name], ["asc", asc.toString()]);
  };

  const asc = searchParams.get("asc") === "true";
  const sortByRaw = columns.includes(searchParams.get("sortBy") as T)
    ? (searchParams.get("sortBy") as T)
    : columns[0];
  const sortName = columns.includes(sortByRaw as T) ? sortByRaw : columns[0];

  const sortBy: SubmissionsSortBy<T> = {
    sortName,
    asc,
  };

  return { handleSortBy, sortBy };
}
