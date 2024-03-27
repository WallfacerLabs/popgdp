import { type ReactNode } from "react";

import { PlusIcon } from "@/components/icons/plusIcon";
import { SunIcon } from "@/components/icons/sunIcon";
import { ThumbUpIcon } from "@/components/icons/thumbUpIcon";

import { CategoryColor } from "./constants";

const categoryIcons = {
  red: <SunIcon />,
  pink: <ThumbUpIcon />,
} satisfies Record<CategoryColor, ReactNode>;

export function getCategoryIcon(
  categoryColor: CategoryColor | undefined,
): ReactNode {
  if (!categoryColor) {
    return <PlusIcon />;
  }

  return categoryIcons[categoryColor];
}
