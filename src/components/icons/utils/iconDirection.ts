import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

export const iconDirections = cva("origin-center", {
  defaultVariants: {
    direction: "right",
  },
  variants: {
    direction: {
      up: "-rotate-90",
      down: "rotate-90",
      left: "rotate-180",
      right: "",
    },
  },
});

export type IconDirection = VariantProps<typeof iconDirections>;
