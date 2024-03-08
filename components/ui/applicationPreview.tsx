import { type ReactNode } from "react";
import Image from "next/image";

import { cn } from "@/lib/cn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import projectPlaceholder from "@/app/images/projectPlaceholder.png";
import { type ApplicationData } from "@/app/waves/[waveId]/applications/create/stepsProvider";

import { CampaignIcon } from "../icons/campaignIcon";
import { ClockIcon } from "../icons/clockIcon";
import { CloudIcon } from "../icons/cloudIcon";
import { TeamIcon } from "../icons/teamIcon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
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
    <div>
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
            {application.projectEntity}
          </ContentRow>

          <Separator />

          <ContentRow label="Proposed project duration">
            {application.projectDuration}
          </ContentRow>

          <Separator />

          <ContentRow label="Proposed budget for wave">
            <WldAmount amount={application.projectBudget} />
          </ContentRow>

          <Separator />

          <ContentRow label="Project summary" vertical>
            {application.projectSummary}
          </ContentRow>
        </div>
        <Image src={projectPlaceholder} alt="" />
      </div>
      <Tabs
        defaultValue={TABS_CONFIG[0].key}
        className="mt-16 flex gap-20"
        orientation="vertical"
      >
        <TabsList className="flex-col items-start justify-start gap-6">
          {TABS_CONFIG.map(({ key, label, icon }) => (
            <TabsTrigger
              value={key}
              key={key}
              className="flex items-center gap-1"
            >
              <span className="h-4 w-4"> {icon}</span>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabContainer index={0}>
          <ContentRow label="Team summary:" vertical>
            {application.teamSummary}
          </ContentRow>
        </TabContainer>
        <TabContainer index={1}>
          <ContentRow label="Project idea:" vertical>
            {application.projectIdea}
          </ContentRow>
          <ContentRow label="Why this & why now:" vertical>
            {application.projectReason}
          </ContentRow>
          <ContentRow label="Project goals:" vertical>
            {application.projectGoals}
          </ContentRow>
          <ContentRow label="Project requirements:" vertical>
            {application.projectRequirements}
          </ContentRow>
        </TabContainer>
        <TabContainer index={2}>
          <ContentRow label="Lorem ipsum:" vertical>
            Lorem ipsum dolor sit amet consectetur. Id odio sapien mi ut nibh mi
            netus. Vulputate nunc risus scelerisque risus tortor tempor. Nullam
            nec sociis aliquet varius enim velit iaculis. Nisi ut lobortis ipsum
            suspendisse facilisi facilisi neque lectus. Nisl massa id
            scelerisque ut imperdiet est aliquam arcu erat. Nunc condimentum
            ultricies quis faucibus ultrices volutpat consequat massa pretium. A
            augue eros molestie lectus netus. Sit ac eu natoque enim nulla nec
            sollicitudin adipiscing. Tincidunt porta adipiscing blandit ac
            suspendisse est venenatis aliquam.
          </ContentRow>
          <ContentRow label="Lorem ipsum:" vertical>
            Lorem ipsum dolor sit amet consectetur. Et faucibus ac faucibus
            nisi. Vestibulum eget aliquet risus scelerisque. Amet dolor urna
            vitae nunc quis gravida ante diam. Ultricies ullamcorper sodales
            nulla et. Ut viverra vestibulum fames scelerisque amet. Nec non sed
            non nulla ultrices amet iaculis. Volutpat id urna diam placerat
            arcu. Posuere eu ut donec nam urna donec. Nunc eget quam justo
            tellus pulvinar.
          </ContentRow>
        </TabContainer>
        <TabContainer index={3}>
          <ContentRow label="Lorem ipsum:" vertical>
            Lorem ipsum dolor sit amet consectetur. Id odio sapien mi ut nibh mi
            netus. Vulputate nunc risus scelerisque risus tortor tempor. Nullam
            nec sociis aliquet varius enim velit iaculis. Nisi ut lobortis ipsum
            suspendisse facilisi facilisi neque lectus. Nisl massa id
            scelerisque ut imperdiet est aliquam arcu erat. Nunc condimentum
            ultricies quis faucibus ultrices volutpat consequat massa pretium. A
            augue eros molestie lectus netus. Sit ac eu natoque enim nulla nec
            sollicitudin adipiscing. Tincidunt porta adipiscing blandit ac
            suspendisse est venenatis aliquam.
          </ContentRow>
          <ContentRow label="Lorem ipsum:" vertical>
            Lorem ipsum dolor sit amet consectetur. Et faucibus ac faucibus
            nisi. Vestibulum eget aliquet risus scelerisque. Amet dolor urna
            vitae nunc quis gravida ante diam. Ultricies ullamcorper sodales
            nulla et. Ut viverra vestibulum fames scelerisque amet. Nec non sed
            non nulla ultrices amet iaculis. Volutpat id urna diam placerat
            arcu. Posuere eu ut donec nam urna donec. Nunc eget quam justo
            tellus pulvinar.
          </ContentRow>
        </TabContainer>
      </Tabs>
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

const TABS_CONFIG = [
  {
    key: "teamInformation",
    label: "Team information",
    icon: <TeamIcon />,
  },
  {
    key: "grantScoping",
    label: "Grant scoping",
    icon: <CampaignIcon />,
  },
  {
    key: "roadmap",
    label: "Roadmap & timeline",
    icon: <ClockIcon />,
  },
  {
    key: "resources",
    label: "Resources & sustainability",
    icon: <CloudIcon />,
  },
] as const;

interface TabContainerProps {
  children: ReactNode;
  index: number;
}

function TabContainer({ children, index }: TabContainerProps) {
  const tabConfig = TABS_CONFIG[index];
  return (
    <TabsContent value={tabConfig.key} className="flex flex-col">
      <div className="flex items-center gap-3 py-2">
        <span className="h-6 w-6">{tabConfig.icon}</span>
        {tabConfig.label}
      </div>
      <div className="mt-8 flex grow flex-col gap-10 border-l pl-10 text-sm">
        {children}
      </div>
    </TabsContent>
  );
}
