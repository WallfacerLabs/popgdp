import { cache } from "react";
import { db } from "@/drizzle/db";
import { Application, CommentValue, Member } from "@/drizzle/schema";
import { eq, sql } from "drizzle-orm";

import { UserId } from "@/lib/auth";

const imageFragment = {
  columns: {
    id: true,
    placeholder: true,
    height: true,
    width: true,
  },
} as const;

const userFragment = {
  columns: {
    name: true,
  },
  with: {
    image: imageFragment,
  },
} as const;

export const getApplicationWithComments = cache(
  async (
    id: (typeof Application.$inferSelect)["id"],
    userId: UserId | undefined,
  ) => {
    return db.query.Application.findFirst({
      where: eq(Application.id, id),
      with: {
        image: imageFragment,
        user: userFragment,
        category: {
          columns: {
            color: true,
            name: true,
          },
        },
        comments: {
          with: {
            commentValues: {
              where: userId ? eq(CommentValue.userId, userId) : sql`false`,
            },
            user: userFragment,
            review: {
              extras: {
                isReview: sql<boolean>`true`.as("isReview"),
              },
            },
          },
        },
        members: {
          columns: {
            name: true,
            position: true,
          },
          with: {
            image: imageFragment,
          },
        },
      },
    });
  },
);

export type ApplicationWithComments = NonNullable<
  Awaited<ReturnType<typeof getApplicationWithComments>>
>;

type MemberInsertData = Array<{
  imageId: string | undefined;
  name: string;
  position: string;
}>;

export function insertApplication(
  applicationData: typeof Application.$inferInsert,
  membersData: MemberInsertData,
) {
  return db.transaction(async (db) => {
    const [{ applicationId }] = await db
      .insert(Application)
      .values(applicationData)
      .returning({ applicationId: Application.id });

    const members = membersData.map((memberData) => ({
      ...memberData,
      applicationId,
    }));

    if (members.length > 0) {
      await db.insert(Member).values(members);
    }

    return applicationId;
  });
}
