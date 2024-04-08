import { cache } from "react";
import { eq } from "drizzle-orm";

import { db } from "../db";
import { Category, Wave } from "../schema";

export const getCategoriesForWave = cache(
  (waveId: (typeof Wave.$inferSelect)["id"]) => {
    return db.query.Category.findMany({
      where: eq(Category.waveId, waveId),
      columns: {
        id: true,
        name: true,
        color: true,
        description: true,
      },
    });
  },
);
