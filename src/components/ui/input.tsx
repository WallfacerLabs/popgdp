import { forwardRef, type InputHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, autoComplete = "off", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-2xl border bg-background px-3 py-2 text-sm transition-colors",
          "placeholder:text-muted-foreground",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "hover:border-primary focus-visible:border-primary focus-visible:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "aria-[invalid=true]:border-red",
          className,
        )}
        ref={ref}
        autoComplete={autoComplete}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
