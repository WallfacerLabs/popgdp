"use client";

import { UseFieldArrayRemove } from "react-hook-form";

import { CrossIcon } from "@/components/icons/crossIcon";
import { Button } from "@/components/ui/button";

import { UserAvatar } from '@/components/ui/userAvatar';
import { teamInformationSchema } from "./teamInformation";

interface MemberPreviewProps {
  member: teamInformationSchema["members"][number];
  index: number;
  removeMember: UseFieldArrayRemove;
}

export const MemberPreview = ({
  member,
  index,
  removeMember,
}: MemberPreviewProps) => {
  const { imageId, name, position } = member;
  return (
    <li className="flex w-full items-center gap-4">
      <div className="flex items-center gap-2">
        <UserAvatar name={name} image={`/api/images/${imageId}`} />
        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold">{name}</span>
          <span className="text-sm">{position}</span>
        </div>
      </div>
      <Button
        type="button"
        variant="outline"
        className="ml-auto h-10 w-10 p-0"
        onClick={() => removeMember(index)}
      >
        <CrossIcon className="h-6 w-6" />
      </Button>
    </li>
  );
};
