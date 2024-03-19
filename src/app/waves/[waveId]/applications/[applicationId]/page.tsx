import { notFound } from "next/navigation";
import { getApplicationWithComments } from "@/drizzle/queries/applications";

import { parseApplicationParams } from "@/lib/paramsValidation";
import { ApplicationPreview } from "@/components/ui/applicationPreview/applicationPreview";
import { BackButton } from "@/components/ui/backButton";
import { CategoryBadge } from "@/components/ui/badge";
import { PageTitle } from "@/components/ui/pageTitle";
import { Separator } from "@/components/ui/separator";

import { ApplicationValueForm } from "./applicationValue/applicationValueForm";
import { Comments } from "./comments/comments";

export default async function Application({ params }: { params: unknown }) {
  const { applicationId, waveId } = parseApplicationParams(params);
  const application = await getApplicationWithComments(applicationId);

  if (!application) {
    return notFound();
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BackButton href={`/waves/${application.waveId}`} />
          <PageTitle>{application.name}</PageTitle>
          <CategoryBadge>Category</CategoryBadge>
        </div>
        <ApplicationValueForm applicationId={applicationId} waveId={waveId} />
      </div>

      <ApplicationPreview
        application={{
          ...application,
          imageId: application.imageId ?? undefined,
          members: application.members.map((member) => ({
            ...member,
            imageId: member.imageId ?? undefined,
          })),
        }}
      />

      <Separator className="my-16" />

      <Comments comments={application.comments} waveId={waveId} />
    </div>
  );
}
