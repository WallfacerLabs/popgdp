import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/cn";

const buttonVariants = cva(
  cn(
    "relative inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium ring-offset-background transition-colors border",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  ),
  {
    variants: {
      variant: {
        primary: cn(
          "bg-primary border-primary text-primary-foreground",
          "hover:bg-background hover:text-primary focus-visible:bg-background focus-visible:text-primary",
        ),
        secondary: cn(
          "border-primary bg-background",
          "hover:bg-primary hover:text-background focus-visible:bg-primary focus-visible:text-background",
        ),
        outline: cn(
          "border bg-background",
          "hover:bg-border focus-visible:bg-border",
        ),
        link: cn(
          "border-0",
          "before:absolute before:bottom-0 before:h-0.5 before:w-full before:bg-primary/10 before:transition-colors before:rounded-sm",
          "hover:before:bg-primary focus-visible:before:bg-primary",
        ),
      },
      size: {
        default: "h-10 px-4 py-2",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, type ButtonProps, buttonVariants };
