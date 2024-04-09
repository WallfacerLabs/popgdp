import { getModeratorPanelApplications } from "@/drizzle/queries/applications";

import { BudgetCell } from "@/components/ui/applicationsTable/cells/budgetCell";
import { CategoryCell } from "@/components/ui/applicationsTable/cells/categoryCell";
import { DateCell } from "@/components/ui/applicationsTable/cells/dateCell";
import { EntityCell } from "@/components/ui/applicationsTable/cells/entityCell";
import { NameCell } from "@/components/ui/applicationsTable/cells/nameCell";
import { UserCell } from "@/components/ui/applicationsTable/cells/userCell";
import { ModeratorNavigation } from "@/components/ui/moderatorNavigation";
import { PageTitle } from "@/components/ui/pageTitle";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ExportSubmissions } from "./exportSubmissions";

export default async function ReviewersPage() {
  const applications = await getModeratorPanelApplications();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <PageTitle>Manage</PageTitle>

        <ExportSubmissions />
      </div>
      <ModeratorNavigation />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project name</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Entity name</TableHead>
            <TableHead>Email</TableHead>
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
                ethereumAddress={application.user.ethereumAddress}
                image={application.userImage}
              />
              <EntityCell entityName={application.entityName} />
              <TableCell>{application.email}</TableCell>
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
