import { UserAvatar } from "./userAvatar";

interface UserPreviewProps {
  image: string | undefined | null;
  name: string | undefined | null;
  role: string | undefined | null;
}

export function UserPreview({ image, name, role }: UserPreviewProps) {
  return (
    <div className="flex items-center gap-2">
      <UserAvatar name={name} image={image} />
      <div className="flex flex-col gap-1">
        <span className="text-sm font-bold">{name}</span>
        <span className="text-sm">{role}</span>
      </div>
    </div>
  );
}
