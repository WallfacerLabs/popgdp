import { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

export const SaveIcon = ({
  className,
  ...props
}: Pick<ComponentPropsWithoutRef<"svg">, "className">) => {
  return (
    <svg
      className={cn("block", className)}
      viewBox="0 -960 960 960"
      color="currentColor"
      {...props}
    >
      <path
        d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h447q16 0 30.5 6t25.5 17l114 114q11 11 17 25.5t6 30.5v447q0 33-23.5 56.5T760-120H200Zm560-526L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM280-560h280q17 0 28.5-11.5T600-600v-80q0-17-11.5-28.5T560-720H280q-17 0-28.5 11.5T240-680v80q0 17 11.5 28.5T280-560Zm-80-86v446-560 114Z"
        fill="currentColor"
      />
    </svg>
  );
};
