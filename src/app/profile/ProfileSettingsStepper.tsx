"use client";

import { useState } from "react";
import { ImageData } from "@/constants/validationSchemas";

import { Stepper } from "@/components/ui/stepper";
import { TeamIcon } from "@/components/icons/teamIcon";
import { WalletIcon } from "@/components/icons/walletIcon";

import { UserDetailsForm } from "./mainDetails/updateUserDetailsForm";
import { AssignWalletForm } from "./wallet/assignWalletForm";

const profileSettingsConfig = [
  {
    name: "Main details",
    icon: <TeamIcon />,
  },
  {
    name: "Wallet",
    icon: <WalletIcon />,
  },
];

interface ProfileSettingsStepperProps {
  userName: string | undefined | null;
  userAvatar: ImageData | undefined | null;
  ethereumAddress: string | undefined | null;
}

export function ProfileSettingsStepper({
  userAvatar,
  userName,
  ethereumAddress,
}: ProfileSettingsStepperProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const incrementStep = () => setCurrentStep((prev) => prev + 1);
  const decrementStep = () => setCurrentStep((prev) => prev - 1);

  return (
    <Stepper currentStep={currentStep} stepsConfig={profileSettingsConfig}>
      <UserDetailsForm
        userAvatar={userAvatar}
        userName={userName}
        incrementStep={incrementStep}
      />
      <AssignWalletForm
        ethereumAddress={ethereumAddress}
        decrementStep={decrementStep}
      />
    </Stepper>
  );
}
