import { type CategoryColor } from "@/types/CategoryColor";

import { Badge } from "../badge";
import { getCategoryIcon } from "./getCategoryIcon";

interface Category {
  color: CategoryColor;
  name: string;
}

interface CategoryBadgeProps {
  category: Category;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <Badge variant={category.color}>
      {getCategoryIcon(category.color)}
      {category.name}
    </Badge>
  );
}
