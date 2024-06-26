"use client";

import { Fragment, type ReactNode } from "react";
import { cva, VariantProps } from "class-variance-authority";

import { Separator } from "@/components/ui/separator";
import { CheckIcon } from "@/components/icons/checkIcon";
import { DotIcon } from "@/components/icons/dotIcon";

import { PageColumns } from "./pageColumns";

type StepsConfig = Array<{
  name: string;
  icon: JSX.Element;
}>;

interface StepperProps {
  stepsConfig: StepsConfig;
  currentStep: number;
  children: ReactNode[];
  className?: string;
}

export function Stepper({
  children,
  currentStep,
  stepsConfig,
  className,
}: StepperProps) {
  return (
    <PageColumns className={className}>
      <div
        className="flex h-fit w-full max-w-[138px] flex-col gap-2"
        data-column="left"
      >
        {stepsConfig.map(({ name }, stepIndex) => (
          <Fragment key={name}>
            <StepperStep
              stepIndex={stepIndex}
              label={name}
              currentStep={currentStep}
            />
            <Separator
              orientation="vertical"
              className="mx-4 h-12 w-0.5 -translate-x-px last:hidden"
            />
          </Fragment>
        ))}
      </div>

      <div
        className="mx-auto flex w-full max-w-xl flex-col gap-6"
        data-column="middle"
      >
        <div className="flex items-center gap-2 [&>svg]:h-6 [&>svg]:w-6">
          {stepsConfig[currentStep].icon}
          <span className="font-bold">{stepsConfig[currentStep].name}</span>
        </div>
        {children[currentStep]}
      </div>
    </PageColumns>
  );
}

const stepVariants = cva("flex items-center gap-2", {
  variants: {
    active: {
      true: "font-bold",
      false: "",
    },
  },
  defaultVariants: {
    active: false,
  },
});

interface StepProps {
  label: string;
  stepIndex: number;
  currentStep: number;
}

function StepperStep({ label, stepIndex, currentStep }: StepProps) {
  const active = stepIndex <= currentStep;

  return (
    <div className={stepVariants({ active })}>
      <StepperIcon stepIndex={stepIndex} currentStep={currentStep} />
      <span className="text-xs capitalize">{label}</span>
    </div>
  );
}

function StepperIcon({
  stepIndex,
  currentStep,
}: Pick<StepProps, "stepIndex" | "currentStep">) {
  if (stepIndex < currentStep) {
    return (
      <StepperIconWrapper variant="success">
        <CheckIcon className="h-6 w-6" />
      </StepperIconWrapper>
    );
  }

  if (stepIndex === currentStep) {
    return (
      <StepperIconWrapper variant="pending">
        <DotIcon className="h-6 w-6" />
      </StepperIconWrapper>
    );
  }

  if (stepIndex > currentStep) {
    return (
      <StepperIconWrapper variant="next">
        <DotIcon className="h-6 w-6" />
      </StepperIconWrapper>
    );
  }
}

const stepperVariant = cva(
  "flex min-h-8 min-w-8 max-h-8 max-w-8 items-center justify-center rounded-full border-2 text-primary",
  {
    defaultVariants: {
      variant: "pending",
    },
    variants: {
      variant: {
        next: "opacity-10 border-primary",
        pending: "border-primary",
        success: "border-green-300 bg-green-300",
      },
    },
  },
);

const StepperIconWrapper = ({
  variant,
  children,
}: VariantProps<typeof stepperVariant> & { children: ReactNode }) => {
  return <div className={stepperVariant({ variant })}>{children}</div>;
};
