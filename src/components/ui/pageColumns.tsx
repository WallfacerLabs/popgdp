import { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export const PageColumns = ({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <div
      className={cn(
        "grid grid-cols-[176px_1fr_176px] justify-between gap-x-28 gap-y-6",
        className,
      )}
      {...props}
    />
  );
};
