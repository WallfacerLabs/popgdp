import { db } from "@/drizzle/db";
import { CommentValue } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";

export function insertCommentValue(data: typeof CommentValue.$inferInsert) {
  return db
    .insert(CommentValue)
    .values(data)
    .onConflictDoUpdate({
      target: [CommentValue.userId, CommentValue.commentId],
      set: { value: data.value },
    });
}

export function deleteCommentValue(query: typeof CommentValue.$inferSelect) {
  return db
    .delete(CommentValue)
    .where(
      and(
        eq(CommentValue.commentId, query.commentId),
        eq(CommentValue.userId, query.userId),
      ),
    );
}
