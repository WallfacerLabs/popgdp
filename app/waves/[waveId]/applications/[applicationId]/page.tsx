import { notFound } from "next/navigation";
import { getApplicationWithComments } from "@/drizzle/queries/applications";

import { formatDate } from "@/lib/dates";
import { parseMarkdown } from "@/lib/parseMarkdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { AddCommentForm } from "./addCommentForm/addCommentForm";

export default async function Application({
  params,
}: {
  params: { applicationId: string };
}) {
  const application = await getApplicationWithComments(
    Number(params.applicationId),
  );

  if (!application) {
    return notFound();
  }

  const applicationHtml = await parseMarkdown(application.description);
  const commentsHtml = await Promise.all(
    application.comments.map((comment) => parseMarkdown(comment.content)),
  );

  return (
    <div className="flex w-full flex-col gap-4">
      <h2 className="text-2xl">{application.name}</h2>
      <Card className="flex gap-8 px-6">
        <Avatar className="my-6">
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
        <div className="my-4 w-full">
          <div className="mb-4 flex items-baseline justify-between text-gray-600">
            <div className="font-medium">{application.users.name}</div>
            <div className="text-sm">{formatDate(application.createdAt)}</div>
          </div>
          <div className="prose max-w-none">
            <div
              dangerouslySetInnerHTML={{
                __html: applicationHtml,
              }}
            />
          </div>
        </div>
      </Card>

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
