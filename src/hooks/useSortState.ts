import { SortBy } from "@/types/Sort";
import { useSearchState } from "@/hooks/useSearchState";

interface SortStateProps<T> {
  columns: readonly T[];
  defaultDescendingColumns?: readonly NoInfer<T>[];
}

interface SortStateSortBy<T> extends Omit<SortBy, "sortName"> {
  sortName: T;
}

export function useSortState<T extends string>({
  columns,
  defaultDescendingColumns,
}: SortStateProps<T>) {
  const { searchParams, updateSearchParams } = useSearchState();

  const handleSortBy = (name: SortStateSortBy<T>["sortName"]): void => {
    const descendingByDefault = defaultDescendingColumns?.includes(name);
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

  const sortBy: SortStateSortBy<T> = {
    sortName,
    asc,
  };

  return { handleSortBy, sortBy };
}
