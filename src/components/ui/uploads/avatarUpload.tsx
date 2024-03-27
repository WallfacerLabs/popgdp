import { useRef, type ChangeEvent } from "react";
import { ImageData } from "@/constants/validationSchemas";

import { cn } from "@/lib/cn";
import { Input } from "@/components/ui/input";
import { CrossIcon } from "@/components/icons/crossIcon";
import { PictureIcon } from "@/components/icons/pictureIcon";

import { Button } from "../button";
import { ImagePreview } from "./imagePreview";
import { uploadImage } from "./uploadImageAction";

interface AvatarUploadProps {
  image: ImageData | undefined;
  onChange: (value: ImageData | undefined) => void;
  className?: string;
}

export function AvatarUpload({
  className,
  image,
  onChange,
}: AvatarUploadProps) {
  const avatarUploadRef = useRef<HTMLInputElement>(null);

  async function onAvatarChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      const imageData = await uploadImage(formData);
      onChange(imageData);
    }
  }

  function onAvatarRemove() {
    onChange(undefined);
    if (avatarUploadRef.current) {
      avatarUploadRef.current.value = "";
    }
  }

  return (
    <div
      className={cn(
        "group relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors",
        "hover:border-primary [&:has(input:focus)]:border-primary",
        className,
      )}
    >
      <label className="h-full w-full cursor-pointer rounded-[inherit] p-0.5 [&:has(input:disabled)]:cursor-not-allowed">
        {image ? <ImagePreview image={image} /> : <Placeholder />}
        <Input
          ref={avatarUploadRef}
          type="file"
          onChange={onAvatarChange}
          className="-z-1 disabled:opacity:0 absolute h-0 w-0 overflow-hidden border-0 p-0 opacity-0"
        />
      </label>
      {image && (
        <Button
          type="button"
          variant="outline"
          className="absolute bottom-0 right-0 h-6 w-6 translate-x-1/4 translate-y-1/4 p-0 opacity-70 transition-all hover:opacity-100 focus-visible:opacity-100"
          onClick={onAvatarRemove}
        >
          <CrossIcon />
        </Button>
      )}
    </div>
  );
}

AvatarUpload.displayName = "AvatarUpload";

const Placeholder = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <PictureIcon className="h-4 w-4 transition-colors" />
    </div>
  );
};
