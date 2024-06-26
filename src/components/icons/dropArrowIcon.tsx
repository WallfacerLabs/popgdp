import { cn } from "@/lib/cn";
import {
  IconDirection,
  iconDirections,
} from "@/components/icons/utils/iconDirection";

import { IconProps } from "./types/Icon";

export const DropArrowIcon = ({
  direction,
  className,
}: IconProps & IconDirection) => {
  return (
    <svg
      className={cn("block", className)}
      viewBox="0 -960 960 960"
      color="currentColor"
    >
      <g
        style={{ transformBox: "fill-box" }}
        className={iconDirections({ direction })}
      >
        <path
          d="M420-308q-8 0-14-5.5t-6-14.5v-304q0-9 6-14.5t14-5.5q2 0 14 6l145 145q5 5 7 10t2 11q0 6-2 11t-7 10L434-314q-3 3-6.5 4.5T420-308Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
