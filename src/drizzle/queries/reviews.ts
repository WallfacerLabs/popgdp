import { count } from "drizzle-orm";

import { db } from "../db";
import { Review } from "../schema";

export const countReviewsQuery = db
  .select({
    userId: Review.userId,
    count: count(Review.userId).as("reviewsCount"),
  })
  .from(Review)
  .groupBy(Review.userId)
  .as("countReviewsQuery");
