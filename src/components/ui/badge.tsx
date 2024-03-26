import { type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/cn";
import { SunIcon } from "@/components/icons/sunIcon";

const badgeVariants = cva(
  cn(
    "inline-flex items-center rounded-full px-2 py-1 min-h-6 gap-1 text-xs font-semibold",
    "[&>svg]:w-3 [&>svg]:h-3",
  ),
  {
    variants: {
      variant: {
        green: "bg-green",
        orange: "bg-orange",
        red: "bg-red",
        blue: "bg-blue",
        pink: "bg-pink",
        purple: "bg-purple",
      },
    },
    defaultVariants: {
      variant: "green",
    },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

function CategoryBadge({ children, ...props }: BadgeProps) {
  return (
    <Badge {...props}>
      <SunIcon className="mr-1 h-3 w-3" />
      {children}
    </Badge>
  );
}

export { Badge, badgeVariants, CategoryBadge };
