import { ChangeEventHandler, HTMLAttributes } from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/cn";
import { Input } from "@/components/ui/input";
import { UploadCloudIcon } from "@/components/icons/uploadCloudIcon";

const imageUploadVariants = cva(
  cn(
    "group flex flex-col gap-2 justify-center items-center relative w-full h-full max-w-56 min-h-44 max-h-44 border rounded-3xl transition-colors cursor-pointer text-center",
    "[&:hover:not(:has(input:disabled))]:border-primary [&:has(input:focus):not(:has(input:disabled))]:border-primary",
    "[&:has(input:disabled)]:cursor-not-allowed [&:has(input:disabled)]:opacity-50",
  ),
  {
    variants: {
      variant: {
        empty: "border-dashed",
        filled: "border-solid",
      },
    },
    defaultVariants: {
      variant: "empty",
    },
  },
);

interface ImageUploadProps extends HTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const ImageUpload = ({
  className,
  placeholder,
  disabled,
  onChange,
}: ImageUploadProps) => {
  return (
    <label className={imageUploadVariants({ variant: "empty", className })}>
      <UploadCloudIcon className="h-6 w-6 text-border transition-colors group-[&:has(input:focus):not(:has(input:disabled))]:text-primary group-[&:hover:not(:has(input:disabled))]:text-primary" />
      {placeholder && (
        <span className="text-sm font-bold group-[&:has(input:disabled)]:opacity-50">
          {placeholder}
        </span>
      )}
      <Input
        type="file"
        disabled={disabled}
        onChange={onChange}
        className="-z-1 disabled:opacity:0 absolute h-0 w-0 overflow-hidden border-0 p-0 opacity-0"
      />
    </label>
  );
};
