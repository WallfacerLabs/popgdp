import { Fragment } from "react";

import { type ApplicationWithComments } from "@/types/Application";
import { type Comment } from "@/types/Comment";
import { type UserId } from "@/types/User";
import {
  canAddComment,
  canAddReview,
  canEditComment,
  canRateComment,
} from "@/config/actionPermissions";
import { sortObjectsByKey } from "@/lib/sort";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { AddCommentForm } from "./addCommentForm/addCommentForm";
import { CommentPreview } from "./comment/commentPreview";

const SECTIONS = {
  discussion: "Discussion",
  reviews: "Reviews",
} as const;

interface CommentsProps {
  userId: UserId | undefined;
  application: ApplicationWithComments;
}

export async function Comments({ application, userId }: CommentsProps) {
  const comments = application.comments.filter(
    (comment) => comment.user.isContentHidden === false,
  );

  const sortedComments = sortObjectsByKey(comments, ["createdAt"], true);

  const reviews = sortedComments.filter((comment) => comment.review?.isReview);

  const { validationErrorMessage: addCommentValidationError } =
    await canAddComment(application.id);
  const { validationErrorMessage: reviewValidationError } = await canAddReview(
    application.id,
  );

  const { validationErrorMessage: editCommentValidationError } =
    await canEditComment(application.id);

  const { validationErrorMessage: rateCommentValidationError } =
    await canRateComment({ waveId: application.waveId });

  return (
    <div className="flex flex-col gap-8">
      <Tabs defaultValue={SECTIONS.discussion}>
        <section>
          <TabsList className="gap-6">
            <SectionButton
              section={SECTIONS.discussion}
              elementsAmount={sortedComments.length}
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
            <CommentsList
              application={application}
              comments={sortedComments}
              userId={userId}
              addCommentValidationError={addCommentValidationError}
              editCommentValidationError={editCommentValidationError}
              rateCommentValidationError={rateCommentValidationError}
            />
          </TabsContent>

          <TabsContent
            value={SECTIONS.reviews}
            className="[&:not(:empty)]:mt-8"
          >
            <CommentsList
              application={application}
              comments={reviews}
              userId={userId}
              addCommentValidationError={addCommentValidationError}
              editCommentValidationError={editCommentValidationError}
              rateCommentValidationError={rateCommentValidationError}
            />
          </TabsContent>
        </section>
      </Tabs>

      <AddCommentForm
        application={application}
        commentValidationError={addCommentValidationError}
        reviewValidationError={reviewValidationError}
      />
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

interface CommentsListProps {
  application: ApplicationWithComments;
  comments: Comment[];
  userId: UserId | undefined;
  addCommentValidationError: string | undefined;
  editCommentValidationError: string | undefined;
  rateCommentValidationError: string | undefined;
}

function CommentsList({
  application,
  comments,
  userId,
  addCommentValidationError,
  editCommentValidationError,
  rateCommentValidationError,
}: CommentsListProps) {
  return comments.map((comment) => (
    <Fragment key={comment.id}>
      <CommentPreview
        application={application}
        comment={comment}
        userId={userId}
        addCommentValidationError={addCommentValidationError}
        editCommentValidationError={editCommentValidationError}
        rateCommentValidationError={rateCommentValidationError}
      />
      <Separator className="my-6 last:hidden" />
    </Fragment>
  ));
}
