import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllReviewers } from "@/drizzle/queries/user";

import { userHasRole, UserPermission } from "@/config/userPermissions";
import { Button } from "@/components/ui/button";
import { ModeratorNavigation } from "@/components/ui/moderatorNavigation";
import { PageTitle } from "@/components/ui/pageTitle";
import { DotsHorizontalIcon } from "@/components/icons/dotsHorizontalIcon";
import { InfoCircleIcon } from "@/components/icons/infoCircleIcon";

import { Reviewers } from "./reviewers";
import { UpdateReviewersDialog } from "./updateReviewersDialog";

export const metadata: Metadata = {
  title: "Reviewers",
};

export default async function ReviewersPage() {
  const isModerator = await userHasRole(UserPermission.moderator);
  if (!isModerator) {
    throw notFound();
  }

  const reviewers = await getAllReviewers();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <PageTitle>Manage</PageTitle>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <InfoCircleIcon className="h-6 w-6" /> Master CSV being replaced
            each time
          </div>

          <UpdateReviewersDialog />

          <Button size="icon" variant="secondary">
            <DotsHorizontalIcon />
          </Button>
        </div>
      </div>

      <ModeratorNavigation />

      <Reviewers reviewers={reviewers} />
    </div>
  );
}
