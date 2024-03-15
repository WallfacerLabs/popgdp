import { ChangeEventHandler, forwardRef, HTMLAttributes } from "react";
import Image from "next/image";

import { cn } from "@/lib/cn";
import { Input } from "@/components/ui/input";
import { CrossIcon } from "@/components/icons/crossIcon";
import { PictureIcon } from "@/components/icons/pictureIcon";

import { Button } from "./button";

interface AvatarUploadProps extends HTMLAttributes<HTMLInputElement> {
  imageId: string | undefined;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onRemove?: () => void;
}

export const AvatarUpload = forwardRef<HTMLInputElement, AvatarUploadProps>(
  ({ className, imageId, onChange, onRemove }, ref) => {
    return (
      <div
        className={cn(
          "group relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors",
          "hover:border-primary [&:has(input:focus)]:border-primary",
          className,
        )}
      >
        <label className="h-full w-full cursor-pointer rounded-[inherit] p-0.5 [&:has(input:disabled)]:cursor-not-allowed">
          {imageId ? <Preview imageId={imageId} /> : <Placeholder />}
          <Input
            ref={ref}
            type="file"
            onChange={onChange}
            className="-z-1 disabled:opacity:0 absolute h-0 w-0 overflow-hidden border-0 p-0 opacity-0"
          />
        </label>
        {imageId && (
          <Button
            type="button"
            variant="outline"
            className="absolute bottom-0 right-0 h-6 w-6 translate-x-1/4 translate-y-1/4 p-0 opacity-70 transition-all hover:opacity-100 focus-visible:opacity-100"
            onClick={onRemove}
          >
            <CrossIcon className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  },
);
AvatarUpload.displayName = "AvatarUpload";

const Placeholder = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <PictureIcon className="h-4 w-4 transition-colors" />
    </div>
  );
};

const Preview = ({ imageId }: Pick<AvatarUploadProps, "imageId">) => {
  return (
    <Image
      src={`/api/images/${imageId}`}
      width={64}
      height={64}
      alt=""
      className="h-full w-full rounded-[inherit] object-cover"
    />
  );
};
