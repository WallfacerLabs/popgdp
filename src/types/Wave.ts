import { type getWaves } from "@/drizzle/queries/waves";

export type WaveWithCategories = NonNullable<
  Awaited<ReturnType<typeof getWaves>>
>[number];

export type Wave = Omit<WaveWithCategories, "categories">;
