import { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

import { CommentProps } from "./comment/comment";
import { parseMarkdown } from "./parseMarkdown";

export async function CommentContent({
  comment,
  className,
}: Pick<CommentProps, "comment"> &
  Pick<HTMLAttributes<HTMLDivElement>, "className">) {
  const commentHtml = await parseMarkdown(comment.content);

  return (
    <div
      className={cn("prose prose-sm max-w-none", className)}
      dangerouslySetInnerHTML={{ __html: commentHtml }}
    />
  );
}
