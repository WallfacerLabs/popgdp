import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getModeratorPanelApplications } from "@/drizzle/queries/applications";

import { userHasRole, UserPermission } from "@/config/userPermissions";
import { ModeratorNavigation } from "@/components/ui/moderatorNavigation";
import { PageHeader } from "@/components/ui/pageHeader";

import { ExportSubmissions } from "./exportSubmissions";
import { Submissions } from "./submissions";

export const metadata: Metadata = {
  title: "Submissions",
};

export default async function ReviewersPage() {
  const isModerator = await userHasRole(UserPermission.moderator);
  if (!isModerator) {
    throw notFound();
  }
  const applications = await getModeratorPanelApplications();

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Manage">
        <ExportSubmissions />
      </PageHeader>
      <ModeratorNavigation />

      <Submissions applications={applications} />
    </div>
  );
}
