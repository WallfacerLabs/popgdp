"use client";

import { type Category } from "@/types/Category";
import { Stepper } from "@/components/ui/stepper";
import { CampaignIcon } from "@/components/icons/campaignIcon";
import { ClockIcon } from "@/components/icons/clockIcon";
import { CloudIcon } from "@/components/icons/cloudIcon";
import { ComputerIcon } from "@/components/icons/computerIcon";
import { TeamIcon } from "@/components/icons/teamIcon";

import { GrantScoping } from "./steps/grantScoping";
import { MainDetails } from "./steps/mainDetails";
import { Resources } from "./steps/resources";
import { Roadmap } from "./steps/roadmap";
import { TeamInformation } from "./steps/teamInformation/teamInformation";
import { useStepsContext } from "./stepsProvider";

const stepsConfig = [
  { name: "Main details", icon: <ComputerIcon /> },
  {
    name: "Team information",
    icon: <TeamIcon />,
  },
  {
    name: "Grant scoping",
    icon: <CampaignIcon />,
  },
  {
    name: "Roadmap & timeline",
    icon: <ClockIcon />,
  },
  {
    name: "Resources & sustainability",
    icon: <CloudIcon />,
  },
];

interface CreateApplicationFormProps {
  categories: Array<Category>;
  previewUrl: string;
}

export default function CreateApplicationForm({
  categories,
  previewUrl,
}: CreateApplicationFormProps) {
  const { currentStep } = useStepsContext();

  return (
    <Stepper currentStep={currentStep} stepsConfig={stepsConfig}>
      <MainDetails categories={categories} />
      <TeamInformation />
      <GrantScoping />
      <Roadmap />
      <Resources previewUrl={previewUrl} />
    </Stepper>
  );
}
