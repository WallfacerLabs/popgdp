import {
  getModeratorPanelApplications,
  type getApplicationWithComments,
} from "@/drizzle/queries/applications";
import { type getWaveWithApplications } from "@/drizzle/queries/waves";

export type Application = NonNullable<
  Awaited<ReturnType<typeof getWaveWithApplications>>
>["applications"][number];

export type ApplicationId = Application["id"];

export type ApplicationWithComments = NonNullable<
  Awaited<ReturnType<typeof getApplicationWithComments>>
>;

export type ModeratorApplication = NonNullable<
  Awaited<ReturnType<typeof getModeratorPanelApplications>>
>[number];
