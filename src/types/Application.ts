import { type getApplicationWithComments } from "@/drizzle/queries/applications";
import { type getWaveWithApplications } from "@/drizzle/queries/waves";

export type Application = NonNullable<
  Awaited<ReturnType<typeof getWaveWithApplications>>
>["applications"][number];

export type ApplicationWithComments = NonNullable<
  Awaited<ReturnType<typeof getApplicationWithComments>>
>;
