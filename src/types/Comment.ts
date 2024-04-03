import { ApplicationWithComments } from "@/drizzle/queries/applications";

export type Comment = ApplicationWithComments["comments"][number];
