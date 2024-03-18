import { HTMLAttributes, type ReactNode } from "react";

import { CampaignIcon } from "@/components/icons/campaignIcon";
import { ClockIcon } from "@/components/icons/clockIcon";
import { CloudIcon } from "@/components/icons/cloudIcon";
import { TeamIcon } from "@/components/icons/teamIcon";
import { type ApplicationData } from "@/app/waves/[waveId]/applications/create/stepsProvider";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";
import { UserPreview } from "../userPreview";

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

interface ApplicationDetailsProps {
  application: ApplicationData;
}

export const ApplicationDetails = ({
  application,
}: ApplicationDetailsProps) => {
  return (
    <Tabs
      defaultValue={TABS_CONFIG[0].key}
      className="flex gap-20"
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
        <ContentRow label="Team summary:">{application.teamSummary}</ContentRow>
        <ContentRow label="Members:">
          <ul className="flex flex-col gap-2">
            {application.members.length > 0 &&
              application.members.map(({ imageId, name, position }, index) => (
                <li key={name + index}>
                  <UserPreview
                    image={`/api/images/${imageId}`}
                    name={name}
                    role={position}
                  />
                </li>
              ))}
          </ul>
        </ContentRow>
      </TabContainer>
      <TabContainer index={1}>
        <ContentRow label="Project idea:">{application.idea}</ContentRow>
        <ContentRow label="Why this & why now:">
          {application.reason}
        </ContentRow>
        <ContentRow label="Project goals:">{application.goals}</ContentRow>
        <ContentRow label="Project requirements:">
          {application.requirements}
        </ContentRow>
      </TabContainer>
      <TabContainer index={2}>
        <ContentRow label="Lorem ipsum:">
          Lorem ipsum dolor sit amet consectetur. Id odio sapien mi ut nibh mi
          netus. Vulputate nunc risus scelerisque risus tortor tempor. Nullam
          nec sociis aliquet varius enim velit iaculis. Nisi ut lobortis ipsum
          suspendisse facilisi facilisi neque lectus. Nisl massa id scelerisque
          ut imperdiet est aliquam arcu erat. Nunc condimentum ultricies quis
          faucibus ultrices volutpat consequat massa pretium. A augue eros
          molestie lectus netus. Sit ac eu natoque enim nulla nec sollicitudin
          adipiscing. Tincidunt porta adipiscing blandit ac suspendisse est
          venenatis aliquam.
        </ContentRow>
        <ContentRow label="Lorem ipsum:">
          Lorem ipsum dolor sit amet consectetur. Et faucibus ac faucibus nisi.
          Vestibulum eget aliquet risus scelerisque. Amet dolor urna vitae nunc
          quis gravida ante diam. Ultricies ullamcorper sodales nulla et. Ut
          viverra vestibulum fames scelerisque amet. Nec non sed non nulla
          ultrices amet iaculis. Volutpat id urna diam placerat arcu. Posuere eu
          ut donec nam urna donec. Nunc eget quam justo tellus pulvinar.
        </ContentRow>
      </TabContainer>
      <TabContainer index={3}>
        <ContentRow label="Lorem ipsum:">
          Lorem ipsum dolor sit amet consectetur. Id odio sapien mi ut nibh mi
          netus. Vulputate nunc risus scelerisque risus tortor tempor. Nullam
          nec sociis aliquet varius enim velit iaculis. Nisi ut lobortis ipsum
          suspendisse facilisi facilisi neque lectus. Nisl massa id scelerisque
          ut imperdiet est aliquam arcu erat. Nunc condimentum ultricies quis
          faucibus ultrices volutpat consequat massa pretium. A augue eros
          molestie lectus netus. Sit ac eu natoque enim nulla nec sollicitudin
          adipiscing. Tincidunt porta adipiscing blandit ac suspendisse est
          venenatis aliquam.
        </ContentRow>
        <ContentRow label="Lorem ipsum:">
          Lorem ipsum dolor sit amet consectetur. Et faucibus ac faucibus nisi.
          Vestibulum eget aliquet risus scelerisque. Amet dolor urna vitae nunc
          quis gravida ante diam. Ultricies ullamcorper sodales nulla et. Ut
          viverra vestibulum fames scelerisque amet. Nec non sed non nulla
          ultrices amet iaculis. Volutpat id urna diam placerat arcu. Posuere eu
          ut donec nam urna donec. Nunc eget quam justo tellus pulvinar.
        </ContentRow>
      </TabContainer>
    </Tabs>
  );
};

interface TabContainerProps {
  children: ReactNode;
  index: number;
}

function TabContainer({ children, index }: TabContainerProps) {
  const tabConfig = TABS_CONFIG[index];
  return (
    <TabsContent value={tabConfig.key} className="flex flex-col">
      <div className="flex items-center gap-3 py-2">
        <div className="h-6 w-6">{tabConfig.icon}</div>
        <h4 className="font-bold">{tabConfig.label}</h4>
      </div>
      <article className="mt-8 flex grow flex-col gap-10 border-l pl-10 text-sm">
        {children}
      </article>
    </TabsContent>
  );
}

interface ContentRowProps {
  label: string;
}

const ContentRow = ({
  children,
  label,
}: ContentRowProps & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <h6 className="font-bold capitalize">{label}</h6>
      {children}
    </div>
  );
};
