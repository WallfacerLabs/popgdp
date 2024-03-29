import { type getWaveWithApplications } from "@/drizzle/queries/waves";

export type Application = NonNullable<
  Awaited<ReturnType<typeof getWaveWithApplications>>
>["applications"][number];
