import { db } from "../db";
import { comments } from "../schema";

export async function insertComment(data: typeof comments.$inferInsert) {
  return db.insert(comments).values(data);
}
