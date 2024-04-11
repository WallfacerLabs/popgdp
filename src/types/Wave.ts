import {
  getWaveWithApplications,
  type getWaves,
} from "@/drizzle/queries/waves";

export type WaveWithCategories = NonNullable<
  Awaited<ReturnType<typeof getWaves>>
>[number];

export type Wave = Omit<WaveWithCategories, "categories">;

export type WaveWithApplications = NonNullable<
  Awaited<ReturnType<typeof getWaveWithApplications>>
>;
