"use client";

import { type Category } from "@/types/Category";
import { cn } from "@/lib/cn";
import { getCategoryIcon } from "@/components/ui/categories/getCategoryIcon";
import { getCategoryStyles } from "@/components/ui/categories/getCategoryStyles";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

interface CategoryFilterProps {
  categories: Category[];
  onCategoryChange: (value: string) => void;
}

const CategoryFilter = ({
  categories,
  onCategoryChange,
}: CategoryFilterProps) => {
  return (
    <Select onValueChange={onCategoryChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.map(({ id, name, color }) => (
          <SelectItem key={id} value={id}>
            <span
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full [&>svg]:h-4 [&>svg]:w-4",
                getCategoryStyles(color),
              )}
            >
              {getCategoryIcon(color)}
            </span>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
