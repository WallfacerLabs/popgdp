"use client";

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

interface ProfileSettingStepperProps {
  userName: string | undefined | null;
  userAvatar: ImageData | undefined | null;
}

export function ProfileSettingStepper({
  userAvatar,
  userName,
}: ProfileSettingStepperProps) {
  return (
    <Stepper currentStep={0} stepsConfig={profileSettingsConfig}>
      <UserDetailsForm userAvatar={userAvatar} userName={userName} />
      <AssignWalletForm />
    </Stepper>
  );
}
