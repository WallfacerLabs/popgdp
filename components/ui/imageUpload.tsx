import { ChangeEventHandler, HTMLAttributes } from "react";

import { cn } from "@/lib/cn";
import { Input } from "@/components/ui/input";
import { UploadCloudIcon } from "@/components/icons/uploadCloudIcon";

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
    <label
      className={cn(
        "group relative flex h-full max-h-44 min-h-44 w-full max-w-56 cursor-pointer flex-col items-center justify-center gap-2 rounded-3xl border border-dashed text-center transition-colors",
        "[&:has(input:focus):not(:has(input:disabled))]:border-primary [&:hover:not(:has(input:disabled))]:border-primary",
        "[&:has(input:disabled)]:cursor-not-allowed [&:has(input:disabled)]:opacity-50",
        className,
      )}
    >
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
