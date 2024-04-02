import { cn } from "@/lib/cn";

import { IconProps } from "./types/Icon";

export const DotIcon = ({ className }: IconProps) => {
  return (
    <svg
      className={cn("block", className)}
      viewBox="0 0 24 24"
      color="currentColor"
    >
      <circle cx="12" cy="12" r="6" fill="currentColor" />
    </svg>
  );
};
