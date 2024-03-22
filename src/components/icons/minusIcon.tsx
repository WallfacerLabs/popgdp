import { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

export const MinusIcon = ({
  className,
  ...props
}: Pick<ComponentPropsWithoutRef<"svg">, "className">) => {
  return (
    <svg
      className={cn("block", className)}
      viewBox="0 -960 960 960"
      color="currentColor"
      {...props}
    >
      <path
        d="M240-440q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h480q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H240Z"
        fill="currentColor"
      />
    </svg>
  );
};
