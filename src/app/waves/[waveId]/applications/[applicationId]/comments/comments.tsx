import { Fragment } from "react";
import { ApplicationWithComments } from "@/drizzle/queries/applications";
import { cva } from "class-variance-authority";

import { formatTime } from "@/lib/dates";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserAvatar } from "@/components/ui/userAvatar";

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
  const reviews = comments.filter((comment) => comment.reviews?.isReview);

  return (
    <div className="flex flex-col gap-8">
      <Tabs defaultValue={SECTIONS.discussion}>
        <TabsList className="mb-8 justify-start gap-6">
          <SectionButton
            section={SECTIONS.discussion}
            elementsAmount={comments.length}
          />
          <SectionButton
            section={SECTIONS.reviews}
            elementsAmount={reviews.length}
          />
        </TabsList>
        <TabsContent value={SECTIONS.discussion}>
          <CommentsList comments={comments} waveId={waveId} />
        </TabsContent>
        <TabsContent value={SECTIONS.reviews}>
          <CommentsList comments={reviews} waveId={waveId} />
        </TabsContent>
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

  const isReview = comment.reviews?.isReview;

  return (
    <div className={commentContainerVariants({ isReview })}>
      {isReview && (
        <Badge variant="orange" className="mb-3 flex w-fit">
          Review
        </Badge>
      )}
      <div className="flex gap-3">
        <UserAvatar name={comment.users.name} image={comment.users.image} />
        <div className="flex w-full flex-col justify-between gap-1">
          <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: commentHtml }}
          />

          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="font-bold">{comment.users.name}</span>
            <Separator className="h-0.5 w-0.5 rounded-full bg-primary opacity-60" />
            <span className="text-foreground/60">Member</span>
            <Separator className="h-0.5 w-0.5 rounded-full bg-primary opacity-60" />
            <span className="text-foreground/60">
              {formatTime(comment.createdAt)}
            </span>
            <CommentValueForm
              applicationId={comment.applicationId}
              waveId={waveId}
              commentId={comment.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const commentContainerVariants = cva("rounded-2xl p-2 pb-4", {
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
