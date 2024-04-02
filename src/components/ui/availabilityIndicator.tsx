import { cva } from "class-variance-authority";

import { cn } from "@/lib/cn";

import { CheckIcon } from "../icons/checkIcon";
import { MinusIcon } from "../icons/minusIcon";

interface AvailabilityIndicatorProps {
  available: boolean;
  children: React.ReactNode;
  className?: string;
}

export const AvailabilityIndicator = ({
  available,
  children,
  className,
}: AvailabilityIndicatorProps) => {
  return (
    <div
      className={cn(availabilityIndicatorVariants({ available }), className)}
    >
      {available ? <CheckIcon /> : <MinusIcon />}
      <span>{children}</span>
    </div>
  );
};

export const availabilityIndicatorVariants = cva(
  cn("flex items-center gap-1 text-xs", "[&>svg]:w-4 [&>svg]:h-4"),
  {
    variants: {
      available: {
        true: "[&>svg]:text-green",
        false: "[&>svg]:text-red [&>span]:opacity-60",
      },
    },
    defaultVariants: {
      available: true,
    },
  },
);
