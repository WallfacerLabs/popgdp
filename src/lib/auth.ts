import { userSchema } from "@/constants/validationSchemas";
import { getSession } from "@auth0/nextjs-auth0";

import { type UserId } from "@/types/User";

export async function getUserData() {
  const session = await getSession();

  if (!session) {
    return undefined;
  }

  const user = userSchema.safeParse(session.user);
  if (!user.success) {
    return undefined;
  }

  return {
    id: user.data.sid,
    verificationLevel: user.data.credentialType,
  };
}

export async function getUserId(): Promise<UserId | undefined> {
  const userData = await getUserData();
  return userData?.id;
}
