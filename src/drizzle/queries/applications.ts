import { cache } from "react";
import { db } from "@/drizzle/db";
import { applications, members } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const getApplicationWithComments = cache(
  async (id: (typeof applications.$inferSelect)["id"]) => {
    return db.query.applications.findFirst({
      where: eq(applications.id, id),
      with: {
        users: {
          columns: {
            image: true,
            name: true,
          },
        },
        comments: {
          with: {
            users: {
              columns: {
                image: true,
                name: true,
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

type MemberInsertData = Omit<typeof members.$inferInsert, "applicationId">;

export async function insertApplication(
  applicationData: typeof applications.$inferInsert,
  membersData: MemberInsertData[],
) {
  const applicationId = await db.transaction(async (db) => {
    const [{ applicationId }] = await db
      .insert(applications)
      .values(applicationData)
      .returning({ applicationId: applications.id });
    await Promise.all(
      membersData.map((memberData) =>
        db.insert(members).values({ ...memberData, applicationId }),
      ),
    );
    return applicationId;
  });

  return applicationId;
}
