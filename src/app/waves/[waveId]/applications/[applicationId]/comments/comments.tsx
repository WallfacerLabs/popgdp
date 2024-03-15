import { ApplicationWithComments } from "@/drizzle/queries/applications";

import { UserAvatar } from "@/components/ui/userAvatar";

import { AddCommentForm } from "./addCommentForm/addCommentForm";
import { parseMarkdown } from "./parseMarkdown";

interface CommentsProps {
  comments: ApplicationWithComments["comments"];
}

export async function Comments({ comments }: CommentsProps) {
  const commentsHtml = await Promise.all(
    comments.map((comment) => parseMarkdown(comment.content)),
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start gap-1">
        <h3 className="text-xl font-bold">Comments</h3>
        <span className="text-sm">({comments.length})</span>
      </div>

      {comments.map((comment, i) => (
        <div className="flex gap-3" key={comment.id}>
          <UserAvatar name={comment.users.name} image={comment.users.image} />

          <div className="flex w-full flex-col justify-between gap-1">
            <span className="text-sm font-bold">{comment.users.name}</span>

            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: commentsHtml[i] }}
            />
          </div>
        </div>
      ))}

      <AddCommentForm />
    </div>
  );
}
