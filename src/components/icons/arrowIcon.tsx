import { cn } from "@/lib/cn";
import {
  IconDirection,
  iconDirections,
} from "@/components/icons/utils/iconDirection";

import { IconProps } from "./types/Icon";

export const ArrowIcon = ({
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
          d="M647-440H200q-17 0-28.5-11.5T160-480q0-17 11.5-28.5T200-520h447L451-716q-12-12-11.5-28t12.5-28q12-11 28-11.5t28 11.5l264 264q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L508-188q-11 11-27.5 11T452-188q-12-12-12-28.5t12-28.5l195-195Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
