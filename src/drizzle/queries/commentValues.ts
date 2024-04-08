import { db } from "@/drizzle/db";
import { CommentValue } from "@/drizzle/schema";
import { and, eq, sql } from "drizzle-orm";

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

export const commentValueSq = db
  .select({
    userId: CommentValue.userId,
    spamCount:
      sql<number>`count(case when ${CommentValue.value} = 'spam' then 1 end)`
        .mapWith(Number)
        .as("spamCount"),
    helpfulCount:
      sql<number>`count(case when ${CommentValue.value} = 'positive' then 1 end)`
        .mapWith(Number)
        .as("helpfulCount"),
  })
  .from(CommentValue)
  .groupBy(CommentValue.userId)
  .as("commentValueSq");
