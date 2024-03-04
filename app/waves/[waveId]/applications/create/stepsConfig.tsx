import { CampaignIcon } from "@/components/icons/campaignIcon";
import { ClockIcon } from "@/components/icons/clockIcon";
import { CloudIcon } from "@/components/icons/cloudIcon";
import { ComputerIcon } from "@/components/icons/computerIcon";
import { TeamIcon } from "@/components/icons/teamIcon";

export const stepsConfig = [
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
