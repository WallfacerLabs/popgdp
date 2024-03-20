import { cache } from "react";
import { db } from "@/drizzle/db";
import { Image } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const getImage = cache(
  async (imageId: (typeof Image.$inferSelect)["id"]) => {
    return db.query.Image.findFirst({ where: eq(Image.id, imageId) });
  },
);

export function insertImage(data: typeof Image.$inferInsert) {
  return db.insert(Image).values(data).returning({ id: Image.id });
}
