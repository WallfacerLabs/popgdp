import { forwardRef, type TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, autoComplete = "off", ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-40 w-full resize-none rounded-2xl border bg-background px-3 py-2 text-sm transition-colors",
          "placeholder:text-muted-foreground",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "focus-visible:border-primary focus-visible:outline-none",
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
Textarea.displayName = "Textarea";

export { Textarea };
