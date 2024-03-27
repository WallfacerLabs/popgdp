import { cache } from "react";
import { eq } from "drizzle-orm";

import { UserId } from "@/lib/auth";

import { db } from "../db";
import { User } from "../schema";

export const getUser = cache(async (id: UserId | undefined) => {
  if (!id) {
    return undefined;
  }

  return db.query.User.findFirst({
    where: eq(User.id, id),
    columns: { id: true, name: true, imageId: true },
  });
});

export function insertUser(data: typeof User.$inferInsert) {
  return db.insert(User).values(data).onConflictDoNothing();
}

export function updateUser(data: typeof User.$inferInsert) {
  return db
    .update(User)
    .set({
      imageId: data.imageId,
      name: data.name,
    })
    .where(eq(User.id, data.id));
}
