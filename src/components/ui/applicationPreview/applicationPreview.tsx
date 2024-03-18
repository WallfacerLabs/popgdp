import { HTMLAttributes } from "react";
import Image from "next/image";
import projectPlaceholder from "@/images/projectPlaceholder.jpg";

import { cn } from "@/lib/cn";
import { Separator } from "@/components/ui/separator";
import { ChevronIcon } from "@/components/icons/chevronIcon";
import { type ApplicationData } from "@/app/waves/[waveId]/applications/create/stepsProvider";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../accordion";
import { UserAvatar } from "../userAvatar";
import { WldAmount } from "../wldAmount";
import { ApplicationDetails } from "./applicationDetails";

export interface Application extends ApplicationData {
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
    <div>
      <div className="grid grid-cols-2 overflow-hidden rounded-3xl border">
        <div className="flex flex-col gap-6 p-10">
          <ContentRow label="User submitting">
            <div className="flex items-center gap-2">
              <UserAvatar
                name={application.users.name}
                image={application.users.image}
              />
              <div className="flex flex-col">
                <span className="font-bold">{application.users.name}</span>
                <span className="text-xs text-gray-600">Member</span>
              </div>
            </div>
          </ContentRow>

          <Separator />

          <ContentRow label="Entity name">{application.entityName}</ContentRow>

          <Separator />

          <ContentRow label="Proposed project duration">
            {application.duration}
          </ContentRow>

          <Separator />

          <ContentRow label="Proposed budget for wave">
            <WldAmount amount={application.budget} />
          </ContentRow>

          <Separator />

          <ContentRow label="Project summary" className="grid-cols-1">
            {application.summary}
          </ContentRow>
        </div>
        {application.imageId ? (
          <Image
            src={`/api/images/${application.imageId}`}
            width={1088}
            height={984}
            alt=""
            className="rounded-l-[inherit]"
          />
        ) : (
          <Image
            src={projectPlaceholder}
            alt=""
            className="rounded-l-[inherit]"
          />
        )}
      </div>
      <section>
        <Accordion
          title="Application details"
          type="multiple"
          className="mt-16"
        >
          <AccordionItem value="applicationDetails" className="flex flex-col">
            <AccordionTrigger className="group min-w-40">
              <span className="group-data-[state=open]:hidden">
                Show details
              </span>
              <span className="group-data-[state=closed]:hidden">
                Hide details
              </span>
              <ChevronIcon direction="down" className="ml-auto h-4 w-4" />
            </AccordionTrigger>
            <AccordionContent className="mt-8">
              <ApplicationDetails application={application} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
}

interface ContentRowProps {
  label: string;
}

const ContentRow = ({
  children,
  label,
  className,
}: ContentRowProps & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "grid grid-cols-[200px_auto] gap-x-8 gap-y-2 text-sm",
        className,
      )}
    >
      <h6 className="font-bold capitalize">{label}</h6>
      {children}
    </div>
  );
};
