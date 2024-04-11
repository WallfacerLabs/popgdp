import { cache } from "react";
import { getSession } from "@auth0/nextjs-auth0";
import { z } from "zod";

const userSchema = z.object({
  sub: z
    .string()
    .transform((sub) => sub.split("|")[2])
    .brand("sessionUserId"),
  credentialType: z.enum(["device", "orb"]),
});

export const getUserData = cache(async () => {
  const session = await getSession();

  const user = userSchema.safeParse(session?.user);
  if (!user.success) {
    return undefined;
  }

  return {
    id: user.data.sub,
    verificationLevel: user.data.credentialType,
  };
});

export async function getUserId() {
  const userData = await getUserData();
  return userData?.id;
}
