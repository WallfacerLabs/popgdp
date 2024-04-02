import { cn } from "@/lib/cn";

import { IconProps } from "./types/Icon";

export const PlusIcon = ({ className }: IconProps) => {
  return (
    <svg
      className={cn("block", className)}
      viewBox="0 -960 960 960"
      color="currentColor"
    >
      <path
        d="M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z"
        fill="currentColor"
      />
    </svg>
  );
};
