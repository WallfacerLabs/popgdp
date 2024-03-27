import { parseMarkdown } from "../parseMarkdown";
import { CommentProps } from "./comment";

export async function CommentContent({
  comment,
}: Pick<CommentProps, "comment">) {
  const commentHtml = await parseMarkdown(comment.content);

  return (
    <div
      className="prose prose-sm max-w-none"
      dangerouslySetInnerHTML={{ __html: commentHtml }}
    />
  );
}
