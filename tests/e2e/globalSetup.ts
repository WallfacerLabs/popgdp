import { db } from "@/drizzle/db";
import { User } from "@/drizzle/schema";

async function globalSetup() {
  await db.delete(User);

  await db
    .insert(User)
    .values({ id: "regularUserId" })
    .returning({ userId: User.id });
}

export default globalSetup;
