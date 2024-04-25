import { getAllReviewers } from "@/drizzle/queries/user";

export interface Reviewer {
  ethereumAddress: string;
}

export type ModeratorPanelReviewer = Awaited<
  ReturnType<typeof getAllReviewers>
>[number];
