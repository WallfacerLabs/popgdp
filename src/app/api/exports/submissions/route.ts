import { notFound } from "next/navigation";
import { NextResponse } from "next/server";
import { getApplicationsExport } from "@/drizzle/queries/applications";
import { stringify } from "csv/sync";

import { userHasRole, UserPermission } from "@/config/userPermissions";

export async function GET() {
  const isModerator = await userHasRole(UserPermission.moderator);
  if (!isModerator) {
    throw notFound();
  }
  const applications = await getApplicationsExport();

  const csvData: any = [
    [
      "project_id",
      "project_name",
      "project_summary",
      "entity_name",
      "project_email",
      "project_duration",
      "project_budget",
      "team_summary",
      "project_idea",
      "project_reason",
      "project_state",
      "project_goals",
      "project_requirements",
      "submission_created_at",
      "user_name",
      "upvotes",
      "invalid_votes",
      "category_name",
    ],
  ];

  for (const row of applications) {
    csvData.push([
      row.id,
      row.name,
      row.summary,
      row.entityName,
      row.email,
      row.duration,
      row.budget,
      row.teamSummary,
      row.idea,
      row.reason,
      row.state,
      row.goals,
      row.requirements,
      row.createdAt,
      row.user.name,
      row.helpfulCount,
      row.invalidCount,
      row.category.name,
    ]);
  }

  return new NextResponse(stringify(csvData));
}
