import { Fragment } from "react";

import { type ApplicationWithComments } from "@/types/Application";
import {
  COMMENT_SECTIONS,
  CommentSection,
  type Comment,
} from "@/types/Comment";
import { type UserId } from "@/types/User";
import {
  canAddComment,
  canAddReview,
  canRateComment,
} from "@/config/actionPermissions";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { AddCommentForm } from "./addCommentForm/addCommentForm";
import { CommentPreview } from "./comment/commentPreview";

interface CommentsProps {
  userId: UserId | undefined;
  application: ApplicationWithComments;
}

export async function Comments({ application, userId }: CommentsProps) {
  const comments = application.comments.filter(
    (comment) => comment.user.isContentHidden === false,
  );

  const reviews = comments.filter((comment) => comment.review?.isReview);

  const { validationErrorMessage: commentValidationError } =
    await canAddComment(application);
  const { validationErrorMessage: reviewValidationError } =
    await canAddReview(application);

  const { validationErrorMessage: rateCommentValidationError } =
    await canRateComment({ waveId: application.waveId });

  return (
    <div className="flex flex-col gap-8">
      <Tabs defaultValue={COMMENT_SECTIONS.discussion}>
        <section>
          <TabsList className="justify-start gap-6">
            <SectionButton
              section={COMMENT_SECTIONS.discussion}
              elementsAmount={comments.length}
            />
            <SectionButton
              section={COMMENT_SECTIONS.reviews}
              elementsAmount={reviews.length}
            />
          </TabsList>

          <TabsContent
            value={COMMENT_SECTIONS.discussion}
            className="flex flex-col gap-6 [&:not(:empty)]:mt-8"
          >
            <CommentsList
              application={application}
              comments={comments}
              userId={userId}
              commentValidationError={commentValidationError}
              rateCommentValidationError={rateCommentValidationError}
              section={COMMENT_SECTIONS.discussion}
            />
          </TabsContent>

          <TabsContent
            value={COMMENT_SECTIONS.reviews}
            className="flex flex-col gap-6 [&:not(:empty)]:mt-8"
          >
            <CommentsList
              application={application}
              comments={reviews}
              userId={userId}
              commentValidationError={commentValidationError}
              rateCommentValidationError={rateCommentValidationError}
              section={COMMENT_SECTIONS.reviews}
            />
          </TabsContent>
        </section>
      </Tabs>

      <AddCommentForm
        application={application}
        commentValidationError={commentValidationError}
        reviewValidationError={reviewValidationError}
      />
    </div>
  );
}

interface SectionButtonProps {
  section: (typeof COMMENT_SECTIONS)[keyof typeof COMMENT_SECTIONS];
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

interface CommentsListProps {
  application: ApplicationWithComments;
  comments: Comment[];
  userId: UserId | undefined;
  commentValidationError: string | undefined;
  rateCommentValidationError: string | undefined;
  // interface CommentsListProps extends CommentsProps {
  section: CommentSection;
}

function CommentsList({
  application,
  comments,
  userId,
  commentValidationError,
  rateCommentValidationError,
  section,
}: CommentsListProps) {
  return comments.map((comment) => (
    <Fragment key={comment.id}>
      <CommentPreview
        application={application}
        comment={comment}
        userId={userId}
        addCommentValidationError={commentValidationError}
        rateCommentValidationError={rateCommentValidationError}
        section={section}
      />
      <Separator className="last:hidden" />
    </Fragment>
  ));
}
