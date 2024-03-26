import { type ReactNode } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";

import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@/components/icons/plusIcon";
import { SunIcon } from "@/components/icons/sunIcon";
import { ThumbUpIcon } from "@/components/icons/thumbUpIcon";

import { badgeColors } from "../badge";
import { categoryNames, type CategoryName } from "./constants";

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
      {categoryNames.map((categoryName) => (
        <RadioGroup.Item
          key={categoryName}
          value={categoryName}
          className="relative"
          asChild
        >
          <Button
            size="icon"
            variant="outline"
            className={cn(
              "rounded-full transition-opacity hover:opacity-70",
              getCategoryColor(categoryName),
            )}
          >
            <RadioGroup.Indicator className="absolute left-0 top-0 h-full w-full rounded-full ring-2 ring-primary ring-offset-2" />
            {getCategoryIcon(categoryName)}
          </Button>
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  );
}

const categoryIcons = {
  red: <SunIcon />,
  pink: <ThumbUpIcon />,
} satisfies Record<CategoryName, ReactNode>;

export function getCategoryIcon(
  categoryName: CategoryName | undefined,
): ReactNode {
  if (!categoryName) {
    return <PlusIcon />;
  }

  return categoryIcons[categoryName];
}

export function getCategoryColor(categoryName: CategoryName | undefined) {
  if (!categoryName) {
    return "";
  }

  const color = badgeColors[categoryName];
  return `${color} hover:${color} focus-visible:${color}`;
}
