import { notFound } from "next/navigation";
import { getApplicationWithComments } from "@/drizzle/queries/applications";

import { parseApplicationParams } from "@/lib/paramsValidation";
import { parseMarkdown } from "@/lib/parseMarkdown";
import { ApplicationPreview } from "@/components/ui/applicationPreview";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BackButton } from "@/components/ui/backButton";
import { CategoryBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { AddCommentForm } from "./addCommentForm/addCommentForm";

export default async function Application({ params }: { params: unknown }) {
  const { applicationId } = parseApplicationParams(params);
  const application = await getApplicationWithComments(applicationId);

  if (!application) {
    return notFound();
  }

  const commentsHtml = await Promise.all(
    application.comments.map((comment) => parseMarkdown(comment.content)),
  );

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BackButton href={`/waves/${application.waveId}`} />
          <h2 className="text-2xl font-bold">{application.name}</h2>
          <CategoryBadge>Category</CategoryBadge>
        </div>
        <Button className="px-16">Vote</Button>
      </div>

      <ApplicationPreview
        application={{
          users: application.users,
          projectBudget: "1,025,000.00",
          projectDuration: "3 months",
          projectName: application.name,
          projectEntity: "Wallfacer",
          projectGoals: "To make the world a better place",
          projectSummary: application.description,
          projectIdea: "This is the best idea ever",
          projectReason: "Because it's the best",
          projectRequirements: "We need a lot of things",
          projectState: "In progress",
          teamSummary: "We are the best team",
          tbd: "TBD",
        }}
      />

      <Separator className="my-16" />

      <div className="flex flex-col gap-8">
        <div className="flex items-start gap-1">
          <h3 className="text-xl font-bold">Comments</h3>
          <span className="text-sm">({application.comments.length})</span>
        </div>

        {application.comments.map((comment, i) => (
          <div className="flex items-center gap-4" key={comment.id}>
            <Avatar>
              <AvatarFallback />

              <AvatarImage
                src={application.users.image || undefined}
                alt={
                  application.users.name
                    ? `${application.users.name} avatar`
                    : undefined
                }
              />
            </Avatar>

            <div className="flex w-full flex-col justify-between">
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: commentsHtml[i] }}
              />

              <div className="text-sm font-bold">{application.users.name}</div>
            </div>
          </div>
        ))}

        <AddCommentForm />
      </div>
    </div>
  );
}
