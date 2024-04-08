import { db } from "@/drizzle/db";
import { CommentValue } from "@/drizzle/schema";
import { and, eq, sql } from "drizzle-orm";

import { ContentValue } from "@/types/ContentValue";

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

function countCommentValue(value: ContentValue) {
  return sql<number>`count(case when ${CommentValue.value} = ${value} then 1 end)`.mapWith(
    Number,
  );
}

export const countCommentValuesQuery = db
  .select({
    userId: CommentValue.userId,
    spamCount: countCommentValue(ContentValue.spam).as("spamCount"),
    helpfulCount: countCommentValue(ContentValue.positive).as("helpfulCount"),
  })
  .from(CommentValue)
  .groupBy(CommentValue.userId)
  .as("countCommentValuesQuery");
