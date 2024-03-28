"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { urls } from "@/constants/urls";

import { UserId } from "@/lib/auth";

interface ProfileSettingsCheckerProps {
  userId: UserId | undefined;
  userName: string | undefined | null;
  children: React.ReactNode;
}

export function ProfileSettingsChecker({
  userId,
  userName,
  children,
}: ProfileSettingsCheckerProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== urls.profile.mainDetails && userId && !userName) {
      router.replace(urls.profile.mainDetails);
    }
  }, [router, pathname, userId, userName]);

  return <>{children}</>;
}
