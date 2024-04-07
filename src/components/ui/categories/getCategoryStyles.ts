import { type CategoryColor } from "@/types/CategoryColor";

import { badgeColors } from "../badge";

export function getCategoryStyles(categoryColor: CategoryColor | undefined) {
  if (!categoryColor) {
    return "";
  }

  const color = badgeColors[categoryColor];
  return `${color} hover:${color} focus-visible:${color}` as const;
}
