import { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

export const FormatUnderlineIcon = ({
  className,
  ...props
}: Pick<ComponentPropsWithoutRef<"svg">, "className">) => {
  return (
    <svg
      className={cn("block", className)}
      viewBox="0 0 24 24"
      color="currentColor"
      {...props}
    >
      <path
        d="M240-120q-17 0-28.5-11.5T200-160q0-17 11.5-28.5T240-200h480q17 0 28.5 11.5T760-160q0 17-11.5 28.5T720-120H240Zm240-160q-101 0-157-63t-56-167v-279q0-21 15.5-36t36.5-15q21 0 36 15t15 36v285q0 56 28 91t82 35q54 0 82-35t28-91v-285q0-21 15.5-36t36.5-15q21 0 36 15t15 36v279q0 104-56 167t-157 63Z"
        fill="currentColor"
      />
    </svg>
  );
};
