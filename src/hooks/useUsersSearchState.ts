import { useSearchState } from "@/hooks/useSearchState";

export function useUsersSearchState() {
  const { searchParams, updateSearchParams } = useSearchState();
  const search = searchParams.get("search") ?? "";

  function onSearchPhraseChange(value: string) {
    updateSearchParams(["search", value]);
  }

  return {
    search,
    onSearchPhraseChange,
  };
}
