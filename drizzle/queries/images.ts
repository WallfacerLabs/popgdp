import { cache } from "react";
import { db } from "@/drizzle/db";
import { images } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const getImage = cache(
  async (imageId: (typeof images.$inferSelect)["id"]) => {
    return db.query.images.findFirst({ where: eq(images.id, imageId) });
  },
);

export function insertImage(data: typeof images.$inferInsert) {
  return db.insert(images).values(data).returning({ id: images.id });
}
