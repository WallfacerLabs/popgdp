
import { UserIcon } from '../icons/userIcon';
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

interface UserAvatarProps {
  name: string | undefined | null;
  image: string | undefined | null;
}

export function UserAvatar({ name, image }: UserAvatarProps) {
  return (
    <Avatar>
      <AvatarFallback>
        <UserIcon className="h-6 w-6 opacity-60" />
      </AvatarFallback>
      <AvatarImage
        src={image || undefined}
        alt={name ? `${name} avatar` : undefined}
      />
    </Avatar>
  );
}
