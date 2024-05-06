import { Metadata } from "next";
import { urls } from "@/constants/urls";
import { getUser } from "@/drizzle/queries/user";

import { getUserId } from "@/lib/auth";
import { PageHeader } from "@/components/ui/pageHeader";
import { Unauthenticated } from "@/components/ui/unauthenticated";

import { ProfileSettingsStepper } from "./ProfileSettingsStepper";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const userId = await getUserId();
  if (!userId) {
    return <Unauthenticated />;
  }

  const user = await getUser(userId);

  return (
    <>
      <PageHeader className="mb-16" title="My Profile" backUrl={urls.root} />

      <ProfileSettingsStepper
        userAvatar={user?.image}
        userName={user?.name}
        ethereumAddress={user?.ethereumAddress}
      />
    </>
  );
}
