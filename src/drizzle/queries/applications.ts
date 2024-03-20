import { cache } from "react";
import { db } from "@/drizzle/db";
import { Application, Member } from "@/drizzle/schema";
import { eq, sql } from "drizzle-orm";

export const getApplicationWithComments = cache(
  async (id: (typeof Application.$inferSelect)["id"]) => {
    return db.query.Application.findFirst({
      where: eq(Application.id, id),
      with: {
        user: {
          columns: {
            image: true,
            name: true,
          },
        },
        comments: {
          with: {
            user: {
              columns: {
                image: true,
                name: true,
              },
            },
            review: {
              extras: {
                isReview: sql<boolean>`true`.as("isReview"),
              },
            },
          },
        },
        members: {
          columns: {
            imageId: true,
            name: true,
            position: true,
          },
        },
      },
    });
  },
);

export type ApplicationWithComments = NonNullable<
  Awaited<ReturnType<typeof getApplicationWithComments>>
>;

type MemberInsertData = Omit<typeof Member.$inferInsert, "applicationId">;

export function insertApplication(
  applicationData: typeof Application.$inferInsert,
  membersData: MemberInsertData[],
) {
  return db.transaction(async (db) => {
    const [{ applicationId }] = await db
      .insert(Application)
      .values(applicationData)
      .returning({ applicationId: Application.id });
    await Promise.all(
      membersData.map((memberData) =>
        db.insert(Member).values({
          ...memberData,
          imageId: memberData.imageId || undefined,
          applicationId,
        }),
      ),
    );
    return applicationId;
  });
}
