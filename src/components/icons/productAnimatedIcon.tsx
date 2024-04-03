import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/cn";

import { IconProps } from "./types/Icon";

export const ProductAnimatedIcon = ({
  className,
  variant,
}: IconProps & VariantProps<typeof animationVariants>) => {
  return (
    <svg
      className={cn("block", className)}
      viewBox="0 0 32 32"
      color="currentColor"
      fill="none"
    >
      <clipPath id="animationClip">
        <rect
          x="0"
          y="0"
          rx="32"
          ry="32"
          width="32"
          height="32"
          strokeWidth="0"
        />
      </clipPath>
      <g clipPath="url(#animationClip)">
        <rect
          x="0"
          y="14.65"
          rx="0"
          width="32"
          height="2.75"
          fill="currentColor"
          className="innerLine"
        />
        <rect
          x="10.25"
          y="10.25"
          rx="8"
          ry="8"
          width="11.5"
          height="11.5"
          stroke-width="2.8"
          stroke="currentColor"
          className="innerCircle"
        >
          {Object.entries(animationSteps).map(([key, values], array) => (
            <animate
              key={key}
              attributeName={key}
              values={values.join(";")}
              dur="10s"
              repeatCount="indefinite"
              keySplines={new Array(values.length - 1)
                .fill(animationVariants({ variant }))
                .join("; ")}
              calcMode="spline"
            />
          ))}
        </rect>
        <circle
          cx="16"
          cy="16"
          r="16"
          stroke="currentColor"
          strokeWidth="5.5"
          className="outerCircle"
        />
      </g>
    </svg>
  );
};

const animationVariants = cva("", {
  variants: {
    variant: {
      current: "0.1 0.5 0.7 1",
      linear: "0,0,1,1",
      ease: ".25,.1,.25,1",
      easeIn: ".42,0,1,1",
      easeOut: "0,0,.58,1",
      easeInOut: ".42,0,.58,1",
    },
  },
  defaultVariants: {
    variant: "linear",
  },
});

const animationSteps = {
  height: [
    11.5, 11.5, 15.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.0,
    15.0, 15.0, 15.0, 11.5, 11.5, 11.5, 11.5, 11.5,
  ],
  width: [
    11.5, 11.5, 15.0, 15.0, 15.0, 26.0, 26.0, 26.0, 15.0, 15.0, 26.0, 26.0,
    26.0, 15.0, 15.0, 11.5, 11.5, 11.5, 11.5, 11.5,
  ],
  x: [
    10.25, 10.25, 8.5, 8.5, 8.5, 8.5, 8.5, 8.5, 8.5, 8.5, -2.5, -2.5, -2.5, 8.5,
    8.5, 10.25, 10.25, 10.25, 10.25, 10.25,
  ],
  y: [
    10.25, 10.25, 8.55, 8.55, 8.55, 8.55, 8.55, 8.55, 8.55, 8.55, 8.55, 8.55,
    8.55, 8.55, 8.55, 10.25, 10.25, 10.25, 10.25, 10.25,
  ],
};
