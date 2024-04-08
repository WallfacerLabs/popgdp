import { db } from "@/drizzle/db";
import { Comment, CommentValue, Review } from "@/drizzle/schema";
import { sql } from "drizzle-orm";

import { ContentValue } from "@/types/ContentValue";

export async function insertComment(data: typeof Comment.$inferInsert) {
  return db.insert(Comment).values(data);
}

export async function insertCommentAsReview(data: typeof Comment.$inferInsert) {
  return db.transaction(async (db) => {
    const [{ commentId }] = await db
      .insert(Comment)
      .values(data)
      .returning({ commentId: Comment.id });

    await db.insert(Review).values({
      commentId,
      applicationId: data.applicationId,
      userId: data.userId,
    });
  });
}

export function countCommentValue(value: ContentValue) {
  return sql<number>`count(case when ${CommentValue.value} = ${value} then 1 end)`.mapWith(
    Number,
  );
}
