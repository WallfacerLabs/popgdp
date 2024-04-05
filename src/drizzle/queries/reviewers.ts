import { type Reviewer as ReviewerType } from "@/types/Reviewer";

import { db } from "../db";
import { Reviewer } from "../schema";

export async function insertReviewers(data: Array<ReviewerType>) {
  await db.delete(Reviewer);

  await db.insert(Reviewer).values(data);
}
