import { type ReactNode } from "react";
import Image from "next/image";

import { cn } from "@/lib/cn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import projectPlaceholder from "@/app/images/projectPlaceholder.png";
import { type ApplicationData } from "@/app/waves/[waveId]/applications/create/stepsProvider";

import { WldAmount } from "./wldAmount";

interface Application extends ApplicationData {
  users: {
    name: string | null | undefined;
    image: string | null | undefined;
  };
}

interface ApplicationPreviewProps {
  application: Application;
}

export function ApplicationPreview({ application }: ApplicationPreviewProps) {
  return (
    <div className="grid grid-cols-2 rounded-3xl border">
      <div className="flex flex-col gap-6 p-10">
        <ContentRow label="User submitting">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarFallback />
              <AvatarImage
                src={application.users.image || undefined}
                alt={`${application.users.name} avatar`}
              />
            </Avatar>
            <div className="flex flex-col">
              <span className="font-bold">{application.users.name}</span>
              <span className="text-xs text-gray-600">Member</span>
            </div>
          </div>
        </ContentRow>

        <Separator />

        <ContentRow label="Entity name">
          <span>{application.projectEntity}</span>
        </ContentRow>

        <Separator />

        <ContentRow label="Proposed project duration">
          <span>{application.projectDuration}</span>
        </ContentRow>

        <Separator />

        <ContentRow label="Proposed budget for wave">
          <WldAmount amount={application.projectBudget} />
        </ContentRow>

        <Separator />

        <ContentRow label="Project summary" vertical>
          <span>{application.projectSummary}</span>
        </ContentRow>
      </div>
      <Image src={projectPlaceholder} alt="" />
    </div>
  );
}

function ContentRow({
  children,
  label,
  vertical,
}: {
  children: ReactNode;
  label: string;
  vertical?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid gap-2 text-sm",
        vertical ? "grid-cols-1" : "grid-cols-2",
      )}
    >
      <span className="font-bold capitalize">{label}</span>
      {children}
    </div>
  );
}
