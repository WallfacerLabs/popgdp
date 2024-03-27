import { useRef, type ChangeEvent } from "react";

import { cn } from "@/lib/cn";
import { Input } from "@/components/ui/input";
import { UploadCloudIcon } from "@/components/icons/uploadCloudIcon";

import { TrashIcon } from "../../icons/trashIcon";
import { Button } from "../button";
import { ImageData, ImagePreview } from "./imagePreview";
import { uploadImage } from "./uploadImageAction";

interface ImageUploadProps {
  placeholder: string;
  disabled?: boolean;
  image: ImageData | undefined;
  onChange: (value: ImageData | undefined) => void;
  className?: string;
}

export function ImageUpload({
  className,
  placeholder,
  disabled,
  image,
  onChange,
}: ImageUploadProps) {
  const imageUploadRef = useRef<HTMLInputElement>(null);

  async function onImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      const imageData = await uploadImage(formData);
      onChange(imageData);
    }
  }

  function onImageRemove() {
    onChange(undefined);
    if (imageUploadRef.current) {
      imageUploadRef.current.value = "";
    }
  }

  return (
    <div
      className={cn(
        "group relative flex h-full max-h-44 min-h-44 w-full max-w-56 flex-col items-center justify-center gap-2 rounded-3xl border border-dashed text-center transition-colors",
        "[&:has(input:focus):not(:has(input:disabled))]:border-primary [&:hover:not(:has(input:disabled))]:border-primary",
        "[&:has(input:disabled)]:opacity-50",
        className,
      )}
    >
      <label className="h-full w-full cursor-pointer rounded-[inherit] [&:has(input:disabled)]:cursor-not-allowed">
        {image ? (
          <ImagePreview image={image} className="p-0.5" />
        ) : (
          <Placeholder placeholder={placeholder} />
        )}
        <Input
          ref={imageUploadRef}
          type="file"
          disabled={disabled}
          onChange={onImageChange}
          className="-z-1 disabled:opacity:0 absolute h-0 w-0 overflow-hidden border-0 p-0 opacity-0"
        />
      </label>
      {image && (
        <Button
          type="button"
          variant="outline"
          className="absolute bottom-2 right-2 h-6 w-6 p-0"
          onClick={onImageRemove}
        >
          <TrashIcon />
        </Button>
      )}
    </div>
  );
}
ImageUpload.displayName = "ImageUpload";

const Placeholder = ({
  placeholder,
}: Pick<ImageUploadProps, "placeholder">) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <UploadCloudIcon className="h-6 w-6 text-border transition-colors group-[&:has(input:focus):not(:has(input:disabled))]:text-primary group-[&:hover:not(:has(input:disabled))]:text-primary" />
      {placeholder && (
        <span className="text-sm font-bold group-[&:has(input:disabled)]:opacity-50">
          {placeholder}
        </span>
      )}
    </div>
  );
};
