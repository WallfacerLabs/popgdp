"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { urls } from "@/constants/urls";

import { type UserId } from "@/types/User";

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
    if (pathname !== urls.profile && userId && !userName) {
      router.replace(urls.profile);
    }
  }, [router, pathname, userId, userName]);

  return <>{children}</>;
}
