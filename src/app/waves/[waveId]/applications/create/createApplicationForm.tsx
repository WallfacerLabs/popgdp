"use client";

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
  { name: "Main details", icon: <ComputerIcon className="h-6 w-6" /> },
  {
    name: "Team information",
    icon: <TeamIcon className="h-6 w-6" />,
  },
  {
    name: "Grant scoping",
    icon: <CampaignIcon className="h-6 w-6" />,
  },
  {
    name: "Roadmap & timeline",
    icon: <ClockIcon className="h-6 w-6" />,
  },
  {
    name: "Resources & sustainability",
    icon: <CloudIcon className="h-6 w-6" />,
  },
];

export function Form() {
  const { currentStep } = useStepsContext();

  return (
    <Stepper currentStep={currentStep} stepsConfig={stepsConfig}>
      <MainDetails />
      <TeamInformation />
      <GrantScoping />
      <Roadmap />
      <Resources />
    </Stepper>
  );
}
