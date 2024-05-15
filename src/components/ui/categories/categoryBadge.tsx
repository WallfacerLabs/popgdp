import { Category } from "@/types/Category";

import { Badge } from "../badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip";
import { getCategoryIcon } from "./getCategoryIcon";

interface CategoryBadgeProps {
  category: Omit<Category, "id">;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Badge variant={category.color}>
          {getCategoryIcon(category.color)}
          {category.name}
        </Badge>
      </TooltipTrigger>
      <TooltipContent>{category.description}</TooltipContent>
    </Tooltip>
  );
}
