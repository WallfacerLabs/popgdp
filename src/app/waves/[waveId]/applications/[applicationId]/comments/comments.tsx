import { Fragment } from "react";
import { ApplicationWithComments } from "@/drizzle/queries/applications";
import { cva } from "class-variance-authority";

import { formatDate } from "@/lib/dates";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserAvatar } from "@/components/ui/userAvatar";

import { AddCommentForm } from "./addCommentForm/addCommentForm";
import { parseMarkdown } from "./parseMarkdown";

const SECTIONS = {
  discussion: "Discussion",
  reviews: "Reviews",
} as const;

interface CommentsProps {
  comments: ApplicationWithComments["comments"];
}

export async function Comments({ comments }: CommentsProps) {
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
          <CommentsList comments={comments} />
        </TabsContent>
        <TabsContent value={SECTIONS.reviews}>
          <CommentsList comments={reviews} />
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
      <span className="text-sm text-foreground/60">({elementsAmount})</span>
    </TabsTrigger>
  );
}

function CommentsList({ comments }: CommentsProps) {
  return comments.map((comment) => (
    <Fragment key={comment.id}>
      <Comment comment={comment} />
      <Separator className="my-6 last:hidden" />
    </Fragment>
  ));
}

interface CommentProps {
  comment: ApplicationWithComments["comments"][number];
}

export async function Comment({ comment }: CommentProps) {
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

            <span className="text-foreground/60">Member</span>
            <span className="text-foreground/60">
              {formatDate(comment.createdAt)}
            </span>
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
