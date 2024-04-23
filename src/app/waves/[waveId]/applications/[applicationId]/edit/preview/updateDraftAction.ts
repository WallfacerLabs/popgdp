import { updateApplication } from "@/drizzle/queries/applications";

import { ApplicationData } from "../../../create/stepsProvider";

export async function updateDraftAction(
  application: ApplicationData,
  waveId: number,
  isDraft: boolean,
) {
  updateApplication({
    draft: isDraft,
    name: application.name,
    summary: application.summary,
    entityName: application.entityName,
    email: application.email,
    duration: String(application.duration),
    budget: application.budget,
    categoryId: application.categoryId,

    teamSummary: application.teamSummary,

    idea: application.idea,
    reason: application.reason,
    state: application.state,
    goals: application.goals,
    requirements: application.requirements,

    tbd: application.tbd,

    imageId: application.image?.id,
    waveId,
    userId: "1",
  });
}
