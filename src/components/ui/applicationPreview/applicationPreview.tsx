import { HTMLAttributes } from "react";
import Image from "next/image";
import { urls } from "@/constants/urls";
import { ImageData } from "@/constants/validationSchemas";
import projectPlaceholder from "@/images/projectPlaceholder.jpg";

import { cn } from "@/lib/cn";
import { Separator } from "@/components/ui/separator";
import { ArrowIcon } from "@/components/icons/arrowIcon";
import { type ApplicationData } from "@/app/waves/[waveId]/applications/create/stepsProvider";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../accordion";
import { UserPreview } from "../userPreview";
import { WldAmount } from "../wldAmount";
import { ApplicationDetails } from "./applicationDetails";

export interface Application extends ApplicationData {
  user: {
    name: string | null;
    image: ImageData | null;
  };
}

interface ApplicationPreviewProps {
  application: Application;
}

export function ApplicationPreview({ application }: ApplicationPreviewProps) {
  return (
    <div className="overflow-hidden rounded-3xl border">
      <div className="grid grid-cols-2">
        <div className="flex flex-col gap-6 p-10">
          <ContentRow label="User submitting">
            <UserPreview
              image={application.user.image}
              name={application.user.name}
              role="Member"
            />
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
        <ApplicationImage
          applicationName={application.name}
          image={application.image}
        />
      </div>
      <Accordion title="Application details" type="multiple">
        <AccordionItem value="applicationDetails" className="flex flex-col">
          <AccordionTrigger className="group w-full justify-center gap-1 border-t p-4 font-bold hover:bg-border focus-visible:bg-border">
            Show
            <span className="group-data-[state=open]:hidden">more</span>
            <span className="group-data-[state=closed]:hidden">less</span>
            details
            <ArrowIcon direction="down" />
          </AccordionTrigger>
          <AccordionContent className="border-t p-10 pt-4">
            <div className="flex flex-col gap-4">
              <ApplicationDetails application={application} />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
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

const imageClassName =
  "ml-auto aspect-square w-full max-w-[544px] rounded-tl-3xl rounded-tr-2xl object-cover object-center";

interface ApplicationImageProps {
  image: ApplicationData["image"];
  applicationName: ApplicationData["name"];
}

function ApplicationImage({ image, applicationName }: ApplicationImageProps) {
  return image ? (
    <Image
      src={urls.image.preview(image.id)}
      width={image.width}
      height={image.height}
      placeholder="blur"
      blurDataURL={image.placeholder}
      alt={`${applicationName} cover image`}
      className={imageClassName}
    />
  ) : (
    <Image
      src={projectPlaceholder}
      placeholder="blur"
      alt={`${applicationName} cover image`}
      className={imageClassName}
    />
  );
}
