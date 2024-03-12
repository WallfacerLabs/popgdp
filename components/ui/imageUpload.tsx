import { HTMLAttributes } from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/cn";
import { Input } from "@/components/ui/input";
import { UploadCloudIcon } from "@/components/icons/uploadCloudIcon";

const imageUploadVariants = cva(
  cn(
    "group flex flex-col gap-2 justify-center items-center relative w-full h-full max-w-56 min-h-44 max-h-44 border rounded-3xl transition-colors cursor-pointer text-center",
    "hover:border-primary focus-within:border-primary [&:has(input:focus):has(input:focus-visible)]:border-primary",
    "[&:has(input:disabled)]:cursor-not-allowed",
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
}

export const ImageUpload = ({
  className,
  onChange,
  placeholder,
}: ImageUploadProps) => {
  return (
    <label className={imageUploadVariants({ variant: "empty", className })}>
      <UploadCloudIcon className="h-6 w-6 text-border transition-colors group-hover:text-primary" />
      {placeholder && <span className="text-sm font-bold">{placeholder}</span>}
      <Input
        type="file"
        onChange={onChange}
        className="-z-1 absolute h-0 w-0 overflow-hidden opacity-0"
      />
    </label>
  );
};
