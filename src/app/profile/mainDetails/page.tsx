import { getUser } from "@/drizzle/queries/user";

import { getUserId } from "@/lib/auth";
import { Unauthenticated } from "@/components/ui/unauthenticated";

import { UserDetailsForm } from "./updateUserDetailsForm";

export default async function MainDetailsPage() {
  const userId = await getUserId();
  if (!userId) {
    return <Unauthenticated />;
  }

  const user = await getUser(userId);

  return <UserDetailsForm userAvatar={user?.image} userName={user?.name} />;
}
