import { db } from "@/drizzle/db";
import { Moderator, User } from "@/drizzle/schema";

const ethereumAddress = "the-ethereum-address";

async function globalSetup() {
  await db.delete(User);

  await db.insert(User).values({ id: "regularUserId", ethereumAddress });

  await db.insert(Moderator).values({ ethereumAddress });
}

export default globalSetup;
