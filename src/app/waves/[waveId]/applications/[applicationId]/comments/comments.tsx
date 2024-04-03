import { Fragment } from "react";

import { type Comment } from "@/types/Comment";
import { type UserId } from "@/types/User";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { AddCommentForm } from "./addCommentForm/addCommentForm";
import { CommentPreview } from "./comment/commentPreview";

const SECTIONS = {
  discussion: "Discussion",
  reviews: "Reviews",
} as const;

interface CommentsProps {
  comments: Comment[];
  waveId: number;
  userId: UserId | undefined;
}

export async function Comments({ comments, waveId, userId }: CommentsProps) {
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
            <CommentsList
              comments={comments}
              allComments={comments}
              waveId={waveId}
              userId={userId}
            />
          </TabsContent>

          <TabsContent
            value={SECTIONS.reviews}
            className="[&:not(:empty)]:mt-8"
          >
            <CommentsList
              comments={reviews}
              allComments={comments}
              waveId={waveId}
              userId={userId}
            />
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

function CommentsList({
  comments,
  waveId,
  userId,
  allComments,
}: CommentsProps & { allComments: Comment[] }) {
  return comments.map((comment) => (
    <Fragment key={comment.id}>
      <CommentPreview
        comment={comment}
        allComments={allComments}
        waveId={waveId}
        userId={userId}
      />
      <Separator className="my-6 last:hidden" />
    </Fragment>
  ));
}
