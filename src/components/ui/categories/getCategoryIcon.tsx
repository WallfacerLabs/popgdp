import { type ReactNode } from "react";

import { type CategoryColor } from "@/types/CategoryColor";
import { PlusIcon } from "@/components/icons/plusIcon";
import { SunIcon } from "@/components/icons/sunIcon";
import { ThumbUpIcon } from "@/components/icons/thumbUpIcon";

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
