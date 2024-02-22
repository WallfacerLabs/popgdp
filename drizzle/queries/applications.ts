import { cache } from "react";
import { eq } from "drizzle-orm";

import { db } from "../db";
import { applications } from "../schema";

export const getApplicationWithComments = cache(async (id: number) => {
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
    },
  });
});

export function insertApplication(data: typeof applications.$inferInsert) {
  return db.insert(applications).values(data);
}
