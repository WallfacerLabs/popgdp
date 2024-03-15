import { cache } from "react";
import { db } from "@/drizzle/db";
import { waves } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

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
