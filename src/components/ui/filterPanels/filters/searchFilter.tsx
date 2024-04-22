import type { ChangeEvent } from "react";
import { useCallback, useState } from "react";

import { cn } from "@/lib/cn";
import { FormHint } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "@/components/icons/searchIcon";

export interface SearchFilterProps {
  searchPhrase: string;
  onSearchPhraseChange: (value: string) => void;
  className?: string;
}

export const SearchFilter = ({
  searchPhrase,
  onSearchPhraseChange,
  className,
  ...props
}: SearchFilterProps) => {
  const [search, setSearch] = useState<string>(searchPhrase ?? "");

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
      onSearchPhraseChange(event.target.value);
    },
    [onSearchPhraseChange],
  );

  return (
    <FormHint className={cn("w-64", className)} rightHint={<SearchIcon />}>
      <Input
        placeholder="Search..."
        value={search}
        onChange={onChange}
        {...props}
      />
    </FormHint>
  );
};
