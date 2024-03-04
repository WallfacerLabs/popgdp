import { type ReactNode } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getApplicationWithComments } from "@/drizzle/queries/applications";

import { cn } from "@/lib/cn";
import { parseMarkdown } from "@/lib/parseMarkdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BackButton } from "@/components/ui/backButton";
import { CategoryBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import projectPlaceholder from "@/app/images/projectPlaceholder.png";

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
      <div className="grid grid-cols-2 rounded-3xl border">
        <div className="flex flex-col gap-6 p-10">
          <ContentRow label="User submitting">
            <div className="flex items-center gap-2">
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
              <div className="flex flex-col">
                <span className="font-bold">{application.users.name}</span>
                <span className="text-xs text-gray-600">Member</span>
              </div>
            </div>
          </ContentRow>

          <Separator />

          <ContentRow label="Entity name">
            <span>Wallfacer</span>
          </ContentRow>

          <Separator />

          <ContentRow label="Proposed project duration">
            <span>3 months</span>
          </ContentRow>

          <Separator />

          <ContentRow label="Proposed budget for wave">
            <span>1,025,000.00 WLD</span>
          </ContentRow>

          <Separator />

          <ContentRow label="Project summary" vertical>
            <span>
              Work towards decentralized governance app for Worldcoin Grants
              using Worldcoin ID, featuring forums, committees, and voting,
              ensuring fair, sybil-proof engagement.
            </span>
          </ContentRow>
        </div>
        <Image src={projectPlaceholder} alt="" />
      </div>

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

function ContentRow({
  children,
  label,
  vertical,
}: {
  children: ReactNode;
  label: string;
  vertical?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid gap-2 text-sm",
        vertical ? "grid-cols-1" : "grid-cols-2",
      )}
    >
      <span className="font-bold capitalize">{label}</span>
      {children}
    </div>
  );
}
