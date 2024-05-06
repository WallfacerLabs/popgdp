import { db } from "@/drizzle/db";
import { Moderator, Reviewer, User } from "@/drizzle/schema";

export async function createModerator(userId: string, ethereumAddress = "0x0") {
  await db.insert(Moderator).values({ ethereumAddress });
  await db.insert(User).values({ id: userId, ethereumAddress });
}

export async function createReviewer(userId: string, ethereumAddress = "0x0") {
  await db.insert(Reviewer).values({ ethereumAddress });
  await db.insert(User).values({ id: userId, ethereumAddress });
}

export async function createBlocked(userId: string) {
  await db.insert(User).values({ id: userId, isBlocked: true });
}

export async function createUser(userId: string) {
  await db.insert(User).values({ id: userId });
}
