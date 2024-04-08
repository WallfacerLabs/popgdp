import { cache } from "react";
import { db } from "@/drizzle/db";
import { Category, Wave } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

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
    ethereumAddress: true,
  },
  with: {
    image: imageFragment,
  },
} as const;

export const getWaves = cache(async () =>
  db.query.Wave.findMany({
    with: {
      categories: {
        columns: {
          id: true,
          name: true,
          color: true,
        },
      },
    },
  }),
);

export const getWaveWithApplications = cache(async (id: number) => {
  const wave = await db.query.Wave.findFirst({
    where: eq(Wave.id, id),
    with: {
      applications: {
        with: {
          user: userFragment,
          category: { columns: { color: true, name: true } },
        },
      },
    },
  });

  return wave;
});

type CategoryInsertData = Omit<typeof Category.$inferInsert, "waveId">;

export function insertWave(
  waveData: typeof Wave.$inferInsert,
  categoriesData: CategoryInsertData[],
) {
  return db.transaction(async (db) => {
    const [{ waveId }] = await db
      .insert(Wave)
      .values(waveData)
      .returning({ waveId: Wave.id });

    const categories = categoriesData.map((categoryData) => ({
      ...categoryData,
      waveId,
    }));

    await db.insert(Category).values(categories);

    return waveId;
  });
}
