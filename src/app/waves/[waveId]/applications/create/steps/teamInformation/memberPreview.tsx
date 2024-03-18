"use client";

import { UseFieldArrayRemove } from "react-hook-form";

import { CrossIcon } from "@/components/icons/crossIcon";
import { Button } from "@/components/ui/button";

import { UserPreview } from '@/components/ui/userPreview';
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
      <UserPreview image={`/api/images/${imageId}`} name={name} role={position} />
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
