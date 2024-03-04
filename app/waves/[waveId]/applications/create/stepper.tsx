"use client";

import { Fragment, type ReactNode } from "react";
import { cva } from "class-variance-authority";

import { Separator } from "@/components/ui/separator";
import { CheckIcon } from "@/components/icons/checkIcon";
import { StepIcon } from "@/components/icons/stepIcon";

import { stepsConfig } from "./stepsConfig";
import { useStepsContext } from "./stepsProvider";

export function CreateApplicationStepper({
  children,
}: {
  children: ReactNode[];
}) {
  const { currentStep } = useStepsContext();

  return (
    <div className="flex gap-16">
      <div className="flex max-h-[420px] w-48 flex-col gap-2">
        {stepsConfig.map(({ name }, stepIndex) => (
          <Fragment key={name}>
            <StepperStep stepIndex={stepIndex} label={name} />
            <Separator orientation="vertical" className="mx-4 last:hidden" />
          </Fragment>
        ))}
      </div>

      <div className="flex w-full max-w-xl flex-col gap-6">
        <span className="font-bold">{stepsConfig[currentStep].name}</span>
        {children[currentStep]}
      </div>
    </div>
  );
}

const stepVariants = cva("flex items-center gap-2", {
  variants: {
    active: {
      true: "text-black",
      false: "text-border",
    },
  },
  defaultVariants: {
    active: false,
  },
});

interface StepProps {
  label: string;
  stepIndex: number;
}

function StepperStep({ label, stepIndex }: StepProps) {
  const { currentStep } = useStepsContext();

  const active = stepIndex <= currentStep;

  return (
    <div className={stepVariants({ active })}>
      <StepperIcon stepIndex={stepIndex} />
      <span className="text-xs font-bold capitalize">{label}</span>
    </div>
  );
}

function StepperIcon({ stepIndex }: Pick<StepProps, "stepIndex">) {
  const { currentStep } = useStepsContext();

  if (stepIndex < currentStep) {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-300">
        <CheckIcon className="h-6 w-6" />
      </div>
    );
  }

  return <StepIcon className="h-8 w-8" />;
}
