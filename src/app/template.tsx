import { ReactNode } from "react";
import { getUser } from "@/drizzle/queries/user";

import { getUserId } from "@/lib/auth";
import { ProfileSettingsChecker } from "@/app/profile/ProfileSettingsChecker";

export default async function Template({ children }: { children: ReactNode }) {
  const userId = await getUserId();
  const user = await getUser(userId);

  return (
    <>
      <ProfileSettingsChecker userId={userId} userName={user?.name}>
        {children}
      </ProfileSettingsChecker>
    </>
  );
}
