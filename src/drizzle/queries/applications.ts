import { cache } from "react";
import { db } from "@/drizzle/db";
import {
  Application,
  ApplicationValue,
  Category,
  CommentValue,
  Image,
  Member,
  User,
} from "@/drizzle/schema";
import { count, eq, sql } from "drizzle-orm";

import { ContentValue } from "@/types/ContentValue";
import { type UserId } from "@/types/User";
import { parseMarkdown } from "@/lib/parseMarkdown";

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
    isContentHidden: true,
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
    const data = await db.query.Application.findFirst({
      where: eq(Application.id, id),
      with: {
        image: imageFragment,
        user: userFragment,
        category: {
          columns: {
            id: true,
            color: true,
            name: true,
            description: true,
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

    if (!data) {
      return undefined;
    }

    const markdownContent = await Promise.all(
      data.comments.map((comment) => parseMarkdown(comment.content)),
    );

    return {
      ...data,
      comments: data.comments.map((comment, index) => ({
        ...comment,
        markdownContent: markdownContent[index],
      })),
    };
  },
);

function countApplicationValue(value: ContentValue) {
  return sql<number>`count(case when ${ApplicationValue.value} = ${value} then 1 end)`.mapWith(
    Number,
  );
}

export const getModeratorPanelApplications = cache(async () => {
  return db
    .select({
      id: Application.id,
      name: Application.name,
      summary: Application.summary,
      entityName: Application.entityName,
      email: Application.email,
      duration: Application.duration,
      budget: Application.budget,
      teamSummary: Application.teamSummary,
      idea: Application.idea,
      reason: Application.reason,
      state: Application.state,
      goals: Application.goals,
      requirements: Application.requirements,
      createdAt: Application.createdAt,
      user: { name: User.name, ethereumAddress: User.ethereumAddress },
      userImage: {
        id: Image.id,
        placeholder: Image.placeholder,
        width: Image.width,
        height: Image.height,
      },
      category: {
        id: Category.id,
        name: Category.name,
        color: Category.color,
        description: Category.description,
      },
      helpfulCount: countApplicationValue(ContentValue.positive),
      spamCount: countApplicationValue(ContentValue.spam),
    })
    .from(Application)
    .leftJoin(
      ApplicationValue,
      eq(Application.id, ApplicationValue.applicationId),
    )
    .innerJoin(User, eq(Application.userId, User.id))
    .innerJoin(Category, eq(Application.categoryId, Category.id))
    .leftJoin(Image, eq(User.imageId, Image.id))
    .groupBy(
      Application.id,
      User.name,
      User.ethereumAddress,
      Category.id,
      Category.name,
      Category.color,
      Category.description,
      Image.id,
    );
});

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

export function updateApplication(
  applicationData: typeof Application.$inferInsert,
  // membersData: MemberInsertData,
) {
  return db.transaction(async (db) => {
    const [{ applicationId }] = await db
      .update(Application)
      .set(applicationData)
      .returning({ applicationId: Application.id });
    return applicationId;
  });
}

export function publishDraft(
  applicationId: (typeof Application.$inferSelect)["id"],
) {
  return db
    .update(Application)
    .set({ draft: false })
    .where(eq(Application.id, applicationId));
}

export const countApplicationsQuery = db
  .select({
    userId: Application.userId,
    count: count(Application.userId).as("applicationsCount"),
  })
  .from(Application)
  .groupBy(Application.userId)
  .as("countApplicationsQuery");
