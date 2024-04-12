import { type getModeratorPanelUsers } from "@/drizzle/queries/user";

import { type getUserId } from "@/lib/auth";

export type UserId = NonNullable<Awaited<ReturnType<typeof getUserId>>>;

export type ModeratorPanelUser = Awaited<
  ReturnType<typeof getModeratorPanelUsers>
>[number];
