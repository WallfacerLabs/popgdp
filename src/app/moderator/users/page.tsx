import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getModeratorPanelUsers } from "@/drizzle/queries/user";

import { userHasRole, UserPermission } from "@/config/userPermissions";
import { ModeratorNavigation } from "@/components/ui/moderatorNavigation";
import { PageHeader } from "@/components/ui/pageHeader";

import { ExportUsers } from "./exportUsers";
import { Users } from "./users";

export const metadata: Metadata = {
  title: "Users",
};

export default async function UsersPage() {
  const isModerator = await userHasRole(UserPermission.moderator);
  if (!isModerator) {
    throw notFound();
  }

  const users = await getModeratorPanelUsers();

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Manage">
        <ExportUsers />
      </PageHeader>

      <ModeratorNavigation />
      <Users users={users} />
    </div>
  );
}
