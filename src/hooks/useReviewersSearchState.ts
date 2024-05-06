import { useSearchState } from "@/hooks/useSearchState";

export function useReviewersSearchState() {
  const { searchParams, updateSearchParams } = useSearchState();
  const search = searchParams.get("search") ?? "";
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  function onSearchPhraseChange(value: string) {
    updateSearchParams(["search", value]);
  }

  return {
    page,
    search,
    onSearchPhraseChange,
  };
}
