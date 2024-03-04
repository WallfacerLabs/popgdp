"use client";

import { Fragment, type ReactNode } from "react";
import { cva } from "class-variance-authority";

import { Separator } from "@/components/ui/separator";
import { StepperIcon } from "@/app/images/icons/stepperIcon";

import { stepsConfig } from "./stepsConfig";
import { useStepsContext } from "./stepsProvider";

export function CreateApplicationStepper({
  children,
}: {
  children: ReactNode;
}) {
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

      {children}
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

  const active = currentStep === stepIndex;

  return (
    <div className={stepVariants({ active })}>
      <StepperIcon />
      <span className="text-xs font-bold capitalize">{label}</span>
    </div>
  );
}
