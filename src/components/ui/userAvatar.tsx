import Image from "next/image";
import { urls } from "@/constants/urls";

import { UserIcon } from "@/components/icons/userIcon";

interface UserAvatarProps {
  name: string | null;
  imageId: string | null | undefined;
}

export function UserAvatar({ name, imageId }: UserAvatarProps) {
  return (
    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border p-0.5">
      {imageId ? (
        <Image
          src={urls.image.preview(imageId)}
          alt={name ? `${name} avatar` : ""}
          width={64}
          height={64}
          className="h-full w-full rounded-[inherit] object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
          <UserIcon className="h-6 w-6 opacity-60" />
        </div>
      )}
    </div>
  );
}
