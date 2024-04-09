import { getModeratorPanelApplications } from "@/drizzle/queries/applications";
import * as csv from "csv/sync";

import { Button } from "@/components/ui/button";

export async function ExportSubmissions() {
  const csvData = await getCsvData();

  return (
    <Button asChild>
      <a
        download="submissionData.csv"
        href={`data:text/csv;charset=utf-8,${encodeURIComponent(csvData)}`}
      >
        Export submissions
      </a>
    </Button>
  );
}

async function getCsvData() {
  const applications = await getModeratorPanelApplications();

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
      "spam_votes",
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
      row.spamCount,
      row.category.name,
    ]);
  }

  return csv.stringify(csvData);
}
