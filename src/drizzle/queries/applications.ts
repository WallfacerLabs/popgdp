import { cache } from "react";
import { db } from "@/drizzle/db";
import { Application, CommentValue, Member } from "@/drizzle/schema";
import { eq, sql } from "drizzle-orm";

import { UserId } from "@/lib/auth";

export const getApplicationWithComments = cache(
  async (
    id: (typeof Application.$inferSelect)["id"],
    userId: UserId | undefined,
  ) => {
    return db.query.Application.findFirst({
      where: eq(Application.id, id),
      with: {
        user: {
          columns: {
            image: true,
            name: true,
          },
        },
        category: {
          columns: {
            color: true,
            name: true,
          },
        },
        comments: {
          with: {
            commentValues: {
              where: userId ? eq(CommentValue.userId, userId) : undefined,
            },
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

    const members = membersData.map((memberData) => ({
      ...memberData,
      imageId: memberData.imageId || undefined,
      applicationId,
    }));

    if (members.length > 0) {
      await db.insert(Member).values(members);
    }

    return applicationId;
  });
}
