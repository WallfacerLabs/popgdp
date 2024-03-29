import { urls } from "@/constants/urls";
import { getUser } from "@/drizzle/queries/user";

import { getUserId } from "@/lib/auth";
import { BackButton } from "@/components/ui/backButton";
import { PageTitle } from "@/components/ui/pageTitle";
import { Unauthenticated } from "@/components/ui/unauthenticated";

import { ProfileSettingStepper } from "./ProfileSettingStepper";

export default async function ProfilePage() {
  const userId = await getUserId();
  if (!userId) {
    return <Unauthenticated />;
  }

  const user = await getUser(userId);

  return (
    <>
      <div className="mb-16 flex items-center gap-4">
        <BackButton href={urls.root} />
        <PageTitle>My profile</PageTitle>
      </div>
      <ProfileSettingStepper userAvatar={user?.image} userName={user?.name} />
    </>
  );
}
