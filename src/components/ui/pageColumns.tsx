import { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export const PageColumns = ({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <div
      className={cn(
        "grid grid-cols-[172px_1fr_172px] justify-between gap-x-12 gap-y-6",
        className,
      )}
      {...props}
    />
  );
};
