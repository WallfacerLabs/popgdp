import { type getUserId } from "@/lib/auth";

export type UserId = NonNullable<Awaited<ReturnType<typeof getUserId>>>;
