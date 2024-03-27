import { ImageData } from "@/constants/validationSchemas";

import { UserIcon } from "@/components/icons/userIcon";

import { ImagePreview } from "./uploads/imagePreview";

interface UserAvatarProps {
  image: ImageData | null | undefined;
}

export function UserAvatar({ image }: UserAvatarProps) {
  return (
    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border p-0.5">
      {image ? (
        <ImagePreview image={image} />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
          <UserIcon className="h-6 w-6 opacity-60" />
        </div>
      )}
    </div>
  );
}
