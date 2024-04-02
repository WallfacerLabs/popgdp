import { cn } from "@/lib/cn";

import { IconProps } from "./types/Icon";

export const FormatBoldIcon = ({ className }: IconProps) => {
  return (
    <svg
      className={cn("block", className)}
      viewBox="0 -960 960 960"
      color="currentColor"
    >
      <path
        d="M352-200q-33 0-56.5-23.5T272-280v-400q0-33 23.5-56.5T352-760h141q65 0 120 40t55 111q0 51-23 78.5T602-491q25 11 55.5 41t30.5 90q0 89-65 124.5T501-200H352Zm41-112h104q48 0 58.5-24.5T566-372q0-11-10.5-35.5T494-432H393v120Zm0-228h93q33 0 48-17t15-38q0-24-17-39t-44-15h-95v109Z"
        fill="currentColor"
      />
    </svg>
  );
};
