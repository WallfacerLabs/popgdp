import { cache } from "react";
import { db } from "@/drizzle/db";
import { Wave } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const getWaves = cache(async () => db.query.Wave.findMany());

export const getWaveWithApplications = cache(async (id: number) => {
  const wave = await db.query.Wave.findFirst({
    where: eq(Wave.id, id),
    with: { applications: { with: { user: { columns: { name: true } } } } },
  });

  return wave;
});

export function insertWave(data: typeof Wave.$inferInsert) {
  return db.insert(Wave).values(data).returning({ id: Wave.id });
}
