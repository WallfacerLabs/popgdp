import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

interface UserAvatarProps {
  name: string | undefined | null;
  image: string | undefined | null;
}

export function UserAvatar({ name, image }: UserAvatarProps) {
  return (
    <Avatar>
      <AvatarFallback />

      <AvatarImage
        src={image || undefined}
        alt={name ? `${name} avatar` : undefined}
      />
    </Avatar>
  );
}
