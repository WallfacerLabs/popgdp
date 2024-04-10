import { type ApplicationWithComments } from "./Application";

export type Comment = ApplicationWithComments["comments"][number];

export const COMMENT_SECTIONS = {
  discussion: "Discussion",
  reviews: "Reviews",
} as const;

export type CommentSection =
  (typeof COMMENT_SECTIONS)[keyof typeof COMMENT_SECTIONS];
