import { HTMLAttributes } from "react";
import { ImageData } from "@/constants/validationSchemas";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/cn";
import { UserIcon } from "@/components/icons/userIcon";

import { ImagePreview } from "./uploads/imagePreview";

interface UserAvatarProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof userAvatarVariants> {
  image: ImageData | null | undefined;
}

export function UserAvatar({ image, size, className }: UserAvatarProps) {
  return (
    <div className={cn(userAvatarVariants({ size }), className)}>
      {image ? (
        <ImagePreview image={image} />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
          <UserIcon className="opacity-60" />
        </div>
      )}
    </div>
  );
}

const userAvatarVariants = cva(
  "relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border p-0.5 bg-background",
  {
    variants: {
      size: {
        small: "w-5 h-5 [&_svg]:w-3 [&_svg]:h-3",
        big: "w-10 h-10 [&_svg]:w-6 [&_svg]:h-6",
      },
    },
    defaultVariants: {
      size: "big",
    },
  },
);
