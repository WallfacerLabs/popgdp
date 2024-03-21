import { BackButton } from "@/components/ui/backButton";
import { PageTitle } from "@/components/ui/pageTitle";
import { Stepper } from "@/components/ui/stepper";
import { ClockIcon } from "@/components/icons/clockIcon";
import { ComputerIcon } from "@/components/icons/computerIcon";

import { MainDetails } from "./steps/mainDetails";
import { Timeline } from "./steps/timeline";

const stepsConfig = [
  { name: "Main details", icon: <ComputerIcon className="h-6 w-6" /> },
  {
    name: "Timeline",
    icon: <ClockIcon className="h-6 w-6" />,
  },
];

export function CreateWaveForm() {
  return (
    <>
      <div className="mb-16 flex items-center gap-4">
        <BackButton href="/" />
        <PageTitle>Create new wave</PageTitle>
      </div>
      <Stepper currentStep={1} stepsConfig={stepsConfig}>
        <MainDetails />
        <Timeline />
      </Stepper>
    </>
  );
}
