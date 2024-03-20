import { cache } from "react";
import { db } from "@/drizzle/db";
import { CommentValue } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";

type CommentValueQuery = {
  commentId: (typeof CommentValue.$inferSelect)["commentId"];
  userId: (typeof CommentValue.$inferSelect)["userId"] | undefined;
};

export const getCommentValue = cache(async (query: CommentValueQuery) => {
  if (!query.userId) {
    return undefined;
  }

  const result = await db.query.CommentValue.findFirst({
    where: and(
      eq(CommentValue.commentId, query.commentId),
      eq(CommentValue.userId, query.userId),
    ),
  });

  return result?.value;
});

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
