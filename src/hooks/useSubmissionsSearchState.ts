import { Category } from "@/types/Category";
import { useSearchState } from "@/hooks/useSearchState";

export function useSubmissionsSearchState() {
  const { searchParams, updateSearchParams } = useSearchState();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const search = searchParams.get("search") ?? "";
  const category = searchParams.get("category") ?? "all";

  function onCategoryChange(value: Category["id"]) {
    updateSearchParams(["category", value]);
  }

  function onSearchPhraseChange(value: string) {
    updateSearchParams(["search", value]);
  }

  return {
    page,
    search,
    category,
    onCategoryChange,
    onSearchPhraseChange,
  };
}
