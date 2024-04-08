import { db } from "@/drizzle/db";
import {
  Application,
  ApplicationValue,
  Category,
  User,
} from "@/drizzle/schema";
import * as csv from "csv/sync";
import { eq, sql } from "drizzle-orm";

import { BudgetCell } from "@/components/ui/applicationsTable/cells/budgetCell";
import { CategoryCell } from "@/components/ui/applicationsTable/cells/categoryCell";
import { DateCell } from "@/components/ui/applicationsTable/cells/dateCell";
import { EntityCell } from "@/components/ui/applicationsTable/cells/entityCell";
import { NameCell } from "@/components/ui/applicationsTable/cells/nameCell";
import { UserCell } from "@/components/ui/applicationsTable/cells/userCell";
import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/ui/pageTitle";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function ReviewersPage() {
  const applications = await db
    .select({
      id: Application.id,
      name: Application.name,
      summary: Application.summary,
      entityName: Application.entityName,
      budget: Application.budget,
      createdAt: Application.createdAt,
      user: { name: User.name, ethereumAddress: User.ethereumAddress },
      category: {
        name: Category.name,
        color: Category.color,
      },
      helpfulCount:
        sql<number>`count(case when ${ApplicationValue.value} = 'positive' then 1 end)`.mapWith(
          Number,
        ),
      spamCount:
        sql<number>`count(case when ${ApplicationValue.value} = 'spam' then 1 end)`.mapWith(
          Number,
        ),
    })
    .from(Application)
    .leftJoin(
      ApplicationValue,
      eq(Application.id, ApplicationValue.applicationId),
    )
    .innerJoin(User, eq(Application.userId, User.id))
    .innerJoin(Category, eq(Application.categoryId, Category.id))
    .groupBy(Application.id, User.name, Category.name, Category.color);

  function getCsvData() {
    const csvData: any = [
      [
        "project_name",
        "user_name",
        "entity_name",
        "create_date",
        "proposed_budget",
        "upvotes",
        "spam_votes",
        "category_name",
      ],
    ];

    for (const row of applications) {
      csvData.push([
        row.name,
        row.user.name,
        row.entityName,
        row.createdAt,
        row.budget,
        row.helpfulCount,
        row.spamCount,
        row.category.name,
      ]);
    }

    return csv.stringify(csvData);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <PageTitle>Manage</PageTitle>

        <Button asChild>
          <a
            download="submissionData.csv"
            href={`data:text/csv;charset=utf-8,${encodeURIComponent(getCsvData())}`}
          >
            Export submissions
          </a>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project name</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Entity name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Proposed budget</TableHead>
            <TableHead>Upvotes</TableHead>
            <TableHead>Spam</TableHead>
            <TableHead>Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((application) => (
            <TableRow key={application.id}>
              <NameCell name={application.name} />
              <UserCell
                name={application.user.name}
                ethereumAddress={null}
                image={null}
              />
              <EntityCell entityName={application.entityName} />
              <DateCell createdAt={application.createdAt} />
              <BudgetCell budget={application.budget} />
              <TableCell>{application.helpfulCount}</TableCell>
              <TableCell>{application.spamCount}</TableCell>
              <CategoryCell category={application.category} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
