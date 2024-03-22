import { cache } from "react";
import { eq } from "drizzle-orm";

import { UserId } from "@/lib/auth";

import { db } from "../db";
import { User } from "../schema";

export const getUser = cache(async (id: UserId | undefined) => {
  if (!id) {
    return undefined;
  }

  return db.query.User.findFirst({ where: eq(User.id, id) });
});

export function insertUser(data: typeof User.$inferInsert) {
  return db.insert(User).values(data).onConflictDoNothing();
}
