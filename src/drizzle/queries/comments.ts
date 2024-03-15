import { db } from "@/drizzle/db";
import { comments } from "@/drizzle/schema";

export async function insertComment(data: typeof comments.$inferInsert) {
  return db.insert(comments).values(data);
}
