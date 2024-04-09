import { getModeratorPanelUsers } from "@/drizzle/queries/user";
import * as csv from "csv/sync";

import { Button } from "@/components/ui/button";

export async function ExportUsers() {
  const csvData = await getCsvData();

  return (
    <Button asChild>
      <a
        download="usersData.csv"
        href={`data:text/csv;charset=utf-8,${encodeURIComponent(csvData)}`}
      >
        Export users
      </a>
    </Button>
  );
}

async function getCsvData() {
  const users = await getModeratorPanelUsers();

  const csvData: any = [
    [
      "user_id",
      "user_name",
      "user_ethereumAddress",
      "user_createdAt",
      "user_imageId",
      "user_reviewsCount",
      "user_spamCount",
      "user_helpfulCount",
      "user_submissionsCount",
    ],
  ];

  for (const row of users) {
    csvData.push([
      row.id,
      row.name,
      row.ethereumAddress,
      row.createdAt,
      row.image?.id,
      row.reviewsCount,
      row.spamCount,
      row.helpfulCount,
      row.submissionsCount,
    ]);
  }

  return csv.stringify(csvData);
}
