import { badgeColors } from "../badge";
import { CategoryColor } from "./constants";

export function getCategoryStyles(categoryColor: CategoryColor | undefined) {
  if (!categoryColor) {
    return "";
  }

  const color = badgeColors[categoryColor];
  return `${color} hover:${color} focus-visible:${color}`;
}
