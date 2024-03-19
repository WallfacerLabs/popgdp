import { cache } from "react";
import { db } from "@/drizzle/db";
import { applicationValues } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";

type ApplicationValueQuery = {
  applicationId: (typeof applicationValues.$inferSelect)["applicationId"];
  userId: (typeof applicationValues.$inferSelect)["userId"] | undefined;
};

export const getApplicationValue = cache(
  async (query: ApplicationValueQuery) => {
    if (!query.userId) {
      return undefined;
    }

    const result = await db.query.applicationValues.findFirst({
      where: and(
        eq(applicationValues.applicationId, query.applicationId),
        eq(applicationValues.userId, query.userId),
      ),
    });

    return result?.value;
  },
);

export function insertApplicationValue(
  data: typeof applicationValues.$inferInsert,
) {
  return db
    .insert(applicationValues)
    .values(data)
    .onConflictDoUpdate({
      target: [applicationValues.userId, applicationValues.applicationId],
      set: { value: data.value },
    });
}

export function deleteApplicationValue(
  query: typeof applicationValues.$inferSelect,
) {
  return db
    .delete(applicationValues)
    .where(
      and(
        eq(applicationValues.applicationId, query.applicationId),
        eq(applicationValues.userId, query.userId),
      ),
    );
}
