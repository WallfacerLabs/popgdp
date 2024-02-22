import { cache } from "react";
import { eq } from "drizzle-orm";

import { db } from "../db";
import { waves } from "../schema";

export const getWaves = cache(async () => db.query.waves.findMany());

export const getWaveWithApplications = cache(async (id: number) => {
  const wave = await db.query.waves.findFirst({
    where: eq(waves.id, id),
    with: { applications: { with: { users: { columns: { name: true } } } } },
  });

  return wave;
});

export function insertWave(data: typeof waves.$inferInsert) {
  return db.insert(waves).values(data).returning({ id: waves.id });
}
