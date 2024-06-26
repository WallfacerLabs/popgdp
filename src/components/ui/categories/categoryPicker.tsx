import * as RadioGroup from "@radix-ui/react-radio-group";

import { categoryColors } from "@/types/CategoryColor";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";

import { getCategoryIcon } from "./getCategoryIcon";
import { getCategoryStyles } from "./getCategoryStyles";

interface CategoryPickerProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
}

export function CategoryPicker({ value, onChange, name }: CategoryPickerProps) {
  return (
    <RadioGroup.Root
      className="grid grid-cols-4 gap-4"
      required
      value={value}
      name={name}
      onValueChange={onChange}
    >
      {categoryColors.map((categoryColor) => (
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
