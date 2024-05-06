import { Metadata } from "next";
import { notFound } from "next/navigation";
import { urls } from "@/constants/urls";
import { getApplicationWithComments } from "@/drizzle/queries/applications";

import { getUserId } from "@/lib/auth";
import { parseApplicationParams } from "@/lib/paramsValidation";
import { ApplicationPreview } from "@/components/ui/applicationPreview/applicationPreview";
import { CategoryBadge } from "@/components/ui/categories/categoryBadge";
import { PageHeader } from "@/components/ui/pageHeader";
import { Separator } from "@/components/ui/separator";

import { ApplicationUserButtons } from "./applicationUserButtons/applicationUserButtons";
import { ApplicationValueForm } from "./applicationValue/applicationValueForm";
import { Comments } from "./comments/comments";

export async function generateMetadata({
  params,
}: {
  params: unknown;
}): Promise<Metadata> {
  const userId = await getUserId();
  const { applicationId } = parseApplicationParams(params);
  const application = await getApplicationWithComments(applicationId, userId);

  if (!application || application.user.isContentHidden) {
    return {
      title: "Submission",
    };
  }
  return {
    title: application.name,
  };
}

export default async function Application({ params }: { params: unknown }) {
  const { applicationId, waveId } = parseApplicationParams(params);
  const userId = await getUserId();
  const application = await getApplicationWithComments(applicationId, userId);

  if (!application || application.user.isContentHidden) {
    return notFound();
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <PageHeader
        className="mb-8"
        title={application.name}
        backUrl={urls.waves.preview({ waveId })}
        badges={<CategoryBadge category={application.category} />}
      >
        {application.userId === userId ? (
          <ApplicationUserButtons application={application} />
        ) : (
          <ApplicationValueForm application={application} />
        )}
      </PageHeader>

      <ApplicationPreview
        application={{
          ...application,
          duration: Number(application.duration),
          tbdb: application.tbd,
          image: application.image ?? undefined,
          members: application.members.map((member) => ({
            ...member,
            image: member.image ?? undefined,
          })),
        }}
      />

      {!application.draft && (
        <>
          <Separator className="my-16" />
          <Comments application={application} userId={userId} />
        </>
      )}
    </div>
  );
}
