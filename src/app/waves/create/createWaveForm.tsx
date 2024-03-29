"use client";

import { Stepper } from "@/components/ui/stepper";
import { ClockIcon } from "@/components/icons/clockIcon";
import { ComputerIcon } from "@/components/icons/computerIcon";

import { MainDetails } from "./steps/mainDetails";
import { Timeline } from "./steps/timeline";
import { useWaveStepsContext } from "./stepsProvider";

const stepsConfig = [
  { name: "Main details", icon: <ComputerIcon /> },
  {
    name: "Timeline",
    icon: <ClockIcon />,
  },
];

export default function CreateWaveForm() {
  const { currentStep } = useWaveStepsContext();

  return (
    <Stepper currentStep={currentStep} stepsConfig={stepsConfig}>
      <MainDetails />
      <Timeline />
    </Stepper>
  );
}
