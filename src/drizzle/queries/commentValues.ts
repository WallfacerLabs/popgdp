import { cache } from "react";
import { db } from "@/drizzle/db";
import { commentValues } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";

type CommentValueQuery = {
  commentId: (typeof commentValues.$inferSelect)["commentId"];
  userId: (typeof commentValues.$inferSelect)["userId"] | undefined;
};

export const getCommentValue = cache(async (query: CommentValueQuery) => {
  if (!query.userId) {
    return undefined;
  }

  const result = await db.query.commentValues.findFirst({
    where: and(
      eq(commentValues.commentId, query.commentId),
      eq(commentValues.userId, query.userId),
    ),
  });

  return result?.value;
});

export function insertCommentValue(data: typeof commentValues.$inferInsert) {
  return db
    .insert(commentValues)
    .values(data)
    .onConflictDoUpdate({
      target: [commentValues.userId, commentValues.commentId],
      set: { value: data.value },
    });
}

export function deleteCommentValue(query: typeof commentValues.$inferSelect) {
  return db
    .delete(commentValues)
    .where(
      and(
        eq(commentValues.commentId, query.commentId),
        eq(commentValues.userId, query.userId),
      ),
    );
}
