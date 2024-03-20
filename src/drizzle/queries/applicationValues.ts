import { cache } from "react";
import { db } from "@/drizzle/db";
import { ApplicationValue } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";

type ApplicationValueQuery = {
  applicationId: (typeof ApplicationValue.$inferSelect)["applicationId"];
  userId: (typeof ApplicationValue.$inferSelect)["userId"] | undefined;
};

export const getApplicationValue = cache(
  async (query: ApplicationValueQuery) => {
    if (!query.userId) {
      return undefined;
    }

    const result = await db.query.ApplicationValue.findFirst({
      where: and(
        eq(ApplicationValue.applicationId, query.applicationId),
        eq(ApplicationValue.userId, query.userId),
      ),
    });

    return result?.value;
  },
);

export function insertApplicationValue(
  data: typeof ApplicationValue.$inferInsert,
) {
  return db
    .insert(ApplicationValue)
    .values(data)
    .onConflictDoUpdate({
      target: [ApplicationValue.userId, ApplicationValue.applicationId],
      set: { value: data.value },
    });
}

export function deleteApplicationValue(
  query: typeof ApplicationValue.$inferSelect,
) {
  return db
    .delete(ApplicationValue)
    .where(
      and(
        eq(ApplicationValue.applicationId, query.applicationId),
        eq(ApplicationValue.userId, query.userId),
      ),
    );
}
