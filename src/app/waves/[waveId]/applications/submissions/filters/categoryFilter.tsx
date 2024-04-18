"use client";

import { type Category } from "@/types/Category";
import { CategoryColor } from "@/types/CategoryColor";
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
import { ClearAllIcon } from "@/components/icons/clearAllIcon";

export type CategoryFilterOption = Omit<Category, "color" | "description"> & {
  color?: CategoryColor;
  description?: string;
};

export interface CategoryFilterProps {
  categories: CategoryFilterOption[];
  onCategoryChange: (value: string) => void;
}

export const CategoryFilter = ({
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
              {getCategoryFilterIcon(color)}
            </span>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

function getCategoryFilterIcon(color: CategoryColor | undefined) {
  if (!color) return <ClearAllIcon />;
  return getCategoryIcon(color);
}
