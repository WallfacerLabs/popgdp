import { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

export const StepIcon = ({
  className,
  ...props
}: Pick<ComponentPropsWithoutRef<"svg">, "className">) => {
  return (
    <svg
      className={cn("block", className)}
      viewBox="0 0 32 32"
      color="currentColor"
      {...props}
    >
      <circle
        cx="16"
        cy="16"
        r="15"
        fill="#fff"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="16" cy="16" r="5.5" fill="currentColor" />
    </svg>
  );
};
