import { type Comment } from "@/types/Comment";
import { formatTime } from "@/lib/dates";
import { MarkdownPreview } from "@/components/ui/markdownPreview";
import { Separator } from "@/components/ui/separator";
import { UserAvatar } from "@/components/ui/userAvatar";

interface CommentBodyProps {
  comment: Comment;
}

export function CommentBody({ comment }: CommentBodyProps) {
  const { user, createdAt, markdownContent } = comment;
  return (
    <article className="flex gap-3">
      <UserAvatar image={user.image} />
      <div className="flex w-full flex-col gap-1">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-bold">{user.name}</span>
            <Separator orientation="dot" className="opacity-60" />
            <span className="opacity-60">Member</span>
            <Separator orientation="dot" className="opacity-60" />
            <span className="opacity-60">{formatTime(createdAt)}</span>
          </div>
        </div>

        <MarkdownPreview body={markdownContent} />
      </div>
    </article>
  );
}
