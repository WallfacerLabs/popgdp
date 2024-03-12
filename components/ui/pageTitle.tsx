import { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export const PageTitle = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h2 className={cn("text-2xl font-bold", className)} {...props}>
      {children}
    </h2>
  );
};
