import { cache } from "react";
import { db } from "@/drizzle/db";
import { applicationValues } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";

export const getApplicationValue = cache(
  async (query: { applicationId: number; userId: string | undefined }) => {
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
  return db.insert(applicationValues).values(data);
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
