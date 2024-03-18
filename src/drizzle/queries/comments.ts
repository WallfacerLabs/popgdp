import { db } from "@/drizzle/db";
import { comments, reviews } from "@/drizzle/schema";

export async function insertComment(data: typeof comments.$inferInsert) {
  return db.insert(comments).values(data);
}

export async function insertCommentAsReview(
  data: typeof comments.$inferInsert,
) {
  return db.transaction(async (db) => {
    const [{ commentId }] = await db
      .insert(comments)
      .values(data)
      .returning({ commentId: comments.id });

    await db.insert(reviews).values({
      commentId,
      applicationId: data.applicationId,
      userId: data.userId,
    });
  });
}
