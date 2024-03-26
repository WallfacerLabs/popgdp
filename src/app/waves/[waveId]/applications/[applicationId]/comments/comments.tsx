import { Fragment } from "react";
import { ApplicationWithComments } from "@/drizzle/queries/applications";
import { cva } from "class-variance-authority";

import { formatTime } from "@/lib/dates";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserAvatar } from "@/components/ui/userAvatar";
import { ReplyIcon } from "@/components/icons/replyIcon";

import { AddCommentForm } from "./addCommentForm/addCommentForm";
import { CommentValueForm } from "./commentValue/commentValueForm";
import { parseMarkdown } from "./parseMarkdown";

const SECTIONS = {
  discussion: "Discussion",
  reviews: "Reviews",
} as const;

interface CommentsProps {
  comments: ApplicationWithComments["comments"];
  waveId: number;
}

export async function Comments({ comments, waveId }: CommentsProps) {
  const reviews = comments.filter((comment) => comment.review?.isReview);

  return (
    <div className="flex flex-col gap-8">
      <Tabs defaultValue={SECTIONS.discussion}>
        <section>
          <TabsList className="justify-start gap-6">
            <SectionButton
              section={SECTIONS.discussion}
              elementsAmount={comments.length}
            />
            <SectionButton
              section={SECTIONS.reviews}
              elementsAmount={reviews.length}
            />
          </TabsList>
          <TabsContent
            value={SECTIONS.discussion}
            className="[&:not(:empty)]:mt-8"
          >
            <CommentsList comments={comments} waveId={waveId} />
          </TabsContent>
          <TabsContent
            value={SECTIONS.reviews}
            className="[&:not(:empty)]:mt-8"
          >
            <CommentsList comments={reviews} waveId={waveId} />
          </TabsContent>
        </section>
      </Tabs>

      <AddCommentForm />
    </div>
  );
}

interface SectionButtonProps {
  section: (typeof SECTIONS)[keyof typeof SECTIONS];
  elementsAmount: number;
}

function SectionButton({ section, elementsAmount }: SectionButtonProps) {
  return (
    <TabsTrigger value={section} className="flex items-start gap-1">
      <h3 className="text-xl font-bold">{section}</h3>
      <span className="text-sm font-normal text-foreground/60">
        ({elementsAmount})
      </span>
    </TabsTrigger>
  );
}

function CommentsList({ comments, waveId }: CommentsProps) {
  return comments.map((comment) => (
    <Fragment key={comment.id}>
      <Comment comment={comment} waveId={waveId} />
      <Separator className="my-6 last:hidden" />
    </Fragment>
  ));
}

interface CommentProps {
  comment: ApplicationWithComments["comments"][number];
  waveId: number;
}

export async function Comment({ comment, waveId }: CommentProps) {
  const commentHtml = await parseMarkdown(comment.content);

  const isReview = comment.review?.isReview;

  return (
    <article className={commentContainerVariants({ isReview })}>
      {isReview && (
        <Badge variant="orange" className="flex w-fit">
          Review
        </Badge>
      )}
      <div className="flex gap-3">
        <UserAvatar name={comment.user.name} image={comment.user.image} />
        <div className="flex w-full flex-col gap-1">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-bold">{comment.user.name}</span>
              <Separator className="h-0.5 w-0.5 rounded-full bg-primary opacity-60" />
              <span className="opacity-60">Member</span>
              <Separator className="h-0.5 w-0.5 rounded-full bg-primary opacity-60" />
              <span className="opacity-60">
                {formatTime(comment.createdAt)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="link"
                className="h-6 p-2 py-0 opacity-60 transition-opacity before:opacity-0 hover:opacity-100 focus-visible:opacity-100"
              >
                <ReplyIcon />
                Reply
              </Button>
            </div>
          </div>
          <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: commentHtml }}
          />
          <CommentValueForm
            className="ml-auto"
            applicationId={comment.applicationId}
            waveId={waveId}
            commentId={comment.id}
          />
        </div>
      </div>
    </article>
  );
}

const commentContainerVariants = cva("flex flex-col gap-3 rounded-2xl p-2", {
  variants: {
    isReview: {
      true: "bg-orange/50",
      false: "",
    },
  },
  defaultVariants: {
    isReview: false,
  },
});
