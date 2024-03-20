import { db } from "@/drizzle/db";
import { Account, Session, User } from "@/drizzle/schema";

import { addDays } from "@/lib/dates";

async function globalSetup() {
  await db.delete(User);

  const [{ userId }] = await db
    .insert(User)
    .values({ id: "regularUserId", email: "regularUser@email.com" })
    .returning({ userId: User.id });

  await db.insert(Session).values({
    userId,
    sessionToken: "regularUserSession",
    expires: addDays(new Date(), 180),
  });

  await db.insert(Account).values({
    userId,
    provider: "mock",
    providerAccountId: "mockId",
    type: "email",
  });
}

export default globalSetup;
