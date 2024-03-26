import { type ReactNode } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";

import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@/components/icons/plusIcon";
import { SunIcon } from "@/components/icons/sunIcon";
import { ThumbUpIcon } from "@/components/icons/thumbUpIcon";

import { badgeColors } from "../badge";
import { categoryColor, type CategoryColor } from "./constants";

interface CategoryPickerProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
}

export function CategoryPicker({ value, onChange, name }: CategoryPickerProps) {
  return (
    <RadioGroup.Root
      className="flex gap-6"
      required
      value={value}
      name={name}
      onValueChange={onChange}
    >
      {categoryColor.map((categoryColor) => (
        <RadioGroup.Item
          key={categoryColor}
          value={categoryColor}
          className="relative"
          asChild
        >
          <Button
            size="icon"
            variant="outline"
            className={cn(
              "rounded-full transition-opacity hover:opacity-70",
              getCategoryStyles(categoryColor),
            )}
          >
            <RadioGroup.Indicator className="absolute left-0 top-0 h-full w-full rounded-full ring-2 ring-primary ring-offset-2" />
            {getCategoryIcon(categoryColor)}
          </Button>
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  );
}

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

export function getCategoryStyles(categoryColor: CategoryColor | undefined) {
  if (!categoryColor) {
    return "";
  }

  const color = badgeColors[categoryColor];
  return `${color} hover:${color} focus-visible:${color}`;
}
