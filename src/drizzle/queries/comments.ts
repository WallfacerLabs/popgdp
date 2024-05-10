import { db } from "@/drizzle/db";
import { Comment, Review } from "@/drizzle/schema";
import { eq, sql } from "drizzle-orm";

import { formatTime } from "@/lib/dates";

export async function insertComment(data: typeof Comment.$inferInsert) {
  return db.insert(Comment).values(data);
}

interface UpdateCommentArgs {
  commentId: string;
  newContent: string;
}

export async function updateComment({
  commentId,
  newContent,
}: UpdateCommentArgs) {
  const formattedContent = `\n\nEdited ${formatTime(new Date())}:\n\n${newContent}`;

  return db
    .update(Comment)
    .set({ content: sql`${Comment.content} || ${formattedContent}` })
    .where(eq(Comment.id, commentId));
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
