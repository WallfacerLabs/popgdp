"use client";

import { forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { Button, type ButtonProps } from "./button";

type SubmitButtonProps = Omit<ButtonProps, "type" | "asChild">;

export const SubmitButton = forwardRef<HTMLButtonElement, SubmitButtonProps>(
  ({ disabled, ...props }, ref) => {
    const { pending } = useFormStatus();

    return (
      <Button
        {...props}
        ref={ref}
        disabled={disabled || pending}
        type="submit"
        aria-disabled={pending}
      />
    );
  }
);
