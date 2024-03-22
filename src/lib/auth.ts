import { getSession } from "@auth0/nextjs-auth0";
import { z } from "zod";

export const userSchema = z.object({
  sid: z.string().brand("sessionUserId"),
});

export type UserId = z.infer<typeof userSchema>["sid"];

export async function getUserId(): Promise<UserId | undefined> {
  const session = await getSession();

  if (!session) {
    return undefined;
  }

  const user = userSchema.safeParse(session.user);
  if (!user.success) {
    return undefined;
  }

  return user.data.sid;
}
