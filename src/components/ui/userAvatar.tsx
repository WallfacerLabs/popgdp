import { ReactNode } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

interface UserAvatarProps {
  name: string | undefined | null;
  image: string | undefined | null;
  fallback?: ReactNode;
}

export function UserAvatar({ name, image, fallback }: UserAvatarProps) {
  return (
    <Avatar>
      <AvatarFallback>{fallback}</AvatarFallback>
      <AvatarImage
        src={image || undefined}
        alt={name ? `${name} avatar` : undefined}
      />
    </Avatar>
  );
}
