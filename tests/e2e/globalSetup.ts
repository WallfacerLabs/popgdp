import { db } from "@/drizzle/db";
import { users, sessions, accounts } from "@/drizzle/schema";
import { addDays } from "date-fns";

async function globalSetup() {
  await db.delete(users);

  const [{ userId }] = await db
    .insert(users)
    .values({ id: "regularUserId", email: "regularUser@email.com" })
    .returning({ userId: users.id });

  await db.insert(sessions).values({
    userId,
    sessionToken: "regularUserSession",
    expires: addDays(new Date(), 180),
  });

  await db.insert(accounts).values({
    userId,
    provider: "mock",
    providerAccountId: "mockId",
    type: "email",
  });
}

export default globalSetup;
