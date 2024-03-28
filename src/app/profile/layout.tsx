"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { urls } from "@/constants/urls";

import { BackButton } from "@/components/ui/backButton";
import { Button } from "@/components/ui/button";
import { PageColumns } from "@/components/ui/pageColumns";
import { PageTitle } from "@/components/ui/pageTitle";
import { TeamIcon } from "@/components/icons/teamIcon";
import { WalletIcon } from "@/components/icons/walletIcon";

interface ProfileLayoutProps {
  children: ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  const pathname = usePathname();

  return (
    <>
      <div className="mb-16 flex items-center gap-4">
        <BackButton href="/" />
        <PageTitle>My profile</PageTitle>
      </div>

      <PageColumns>
        <div className="flex h-fit w-fit max-w-[138px] flex-col gap-6">
          <Button
            variant="link"
            className="justify-start font-bold"
            data-active={pathname === urls.profile.mainDetails}
            asChild
          >
            <Link href={urls.profile.mainDetails}>
              <TeamIcon />
              Main details
            </Link>
          </Button>
          <Button
            variant="link"
            className="justify-start font-bold"
            data-active={pathname === urls.profile.wallet}
            asChild
          >
            <Link href={urls.profile.wallet}>
              <WalletIcon /> Wallet
            </Link>
          </Button>
        </div>
        {children}
      </PageColumns>
    </>
  );
}
