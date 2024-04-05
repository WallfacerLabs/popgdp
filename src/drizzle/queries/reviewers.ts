import { type Reviewer as ReviewerType } from "@/types/Reviewer";

import { db } from "../db";
import { Reviewer } from "../schema";

export async function updateReviewers(data: Array<ReviewerType>) {
  await db.transaction(async (tx) => {
    await tx.delete(Reviewer);

    if (data.length > 0) {
      await tx.insert(Reviewer).values(data);
    }
  });
}
