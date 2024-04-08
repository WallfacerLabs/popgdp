import { db } from "@/drizzle/db";
import { Comment, Review } from "@/drizzle/schema";

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
