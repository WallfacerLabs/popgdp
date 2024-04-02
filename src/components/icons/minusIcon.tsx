import { cn } from "@/lib/cn";

import { IconProps } from "./types/Icon";

export const MinusIcon = ({ className }: IconProps) => {
  return (
    <svg
      className={cn("block", className)}
      viewBox="0 -960 960 960"
      color="currentColor"
    >
      <path
        d="M240-440q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h480q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H240Z"
        fill="currentColor"
      />
    </svg>
  );
};
