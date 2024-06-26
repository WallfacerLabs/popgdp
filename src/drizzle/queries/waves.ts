import { cache } from "react";
import { QueryError } from "@/constants/errors";
import { db } from "@/drizzle/db";
import { Category, Wave } from "@/drizzle/schema";
import { eq, gt, inArray, SQL, sql } from "drizzle-orm";

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
    isContentHidden: true,
  },
  with: {
    image: imageFragment,
  },
} as const;

export const getWaves = cache(async () => {
  return db.query.Wave.findMany({
    with: {
      categories: {
        columns: {
          id: true,
          name: true,
          color: true,
          description: true,
        },
      },
    },
  });
});

export const getWaveDates = cache(async (waveId: number) => {
  const wave = await db.query.Wave.findFirst({
    where: eq(Wave.id, waveId),
    columns: {
      openStartDate: true,
      denoisingStartDate: true,
      assesmentStartDate: true,
      closeDate: true,
    },
  });

  if (!wave) {
    throw new QueryError("Wave not found");
  }

  return wave;
});

const getWave = async (where: SQL) => {
  const wave = await db.query.Wave.findFirst({
    where,
    with: {
      applications: {
        with: {
          user: userFragment,
          category: {
            columns: { id: true, name: true, color: true, description: true },
          },
        },
      },
      categories: {
        columns: {
          id: true,
          name: true,
          color: true,
          description: true,
        },
      },
    },
  });

  return wave;
};

const firstNotClosedWave = db
  .select({ id: Wave.id })
  .from(Wave)
  .where(gt(Wave.closeDate, sql`now()`))
  .limit(1);

export const getFirstNotClosedWave = cache(async () => {
  return getWave(inArray(Wave.id, firstNotClosedWave));
});

export const getWaveWithApplications = cache(async (id: number) => {
  return getWave(eq(Wave.id, id));
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
