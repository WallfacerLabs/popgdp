import { type getWaveWithApplications } from "@/drizzle/queries/waves";

export type Wave = NonNullable<
  Awaited<ReturnType<typeof getWaveWithApplications>>
>;
