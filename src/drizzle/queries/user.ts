import { cache } from "react";
import { eq } from "drizzle-orm";

import { type UserId } from "@/types/User";

import { db } from "../db";
import { Image, Moderator, Reviewer, User } from "../schema";
import { countApplicationsQuery } from "./applications";
import { countCommentValuesQuery } from "./commentValues";
import { countReviewsQuery } from "./reviews";

export const getUser = cache(async (id: UserId | undefined) => {
  if (!id) {
    return undefined;
  }

  return db.query.User.findFirst({
    where: eq(User.id, id),
    columns: { id: true, name: true, ethereumAddress: true },
    with: {
      image: {
        columns: {
          id: true,
          height: true,
          width: true,
          placeholder: true,
        },
      },
    },
  });
});

export const getUserRoles = cache(async (id: UserId) => {
  const [roles] = await db
    .select({
      isReviewer: Reviewer.ethereumAddress,
      isModerator: Moderator.ethereumAddress,
      isBlocked: User.isBlocked,
    })
    .from(User)
    .leftJoin(Reviewer, eq(User.ethereumAddress, Reviewer.ethereumAddress))
    .leftJoin(Moderator, eq(User.ethereumAddress, Moderator.ethereumAddress))
    .where(eq(User.id, id));

  return {
    isModerator: !!roles?.isModerator,
    isReviewer: !!roles?.isReviewer,
    isBlocked: roles?.isBlocked,
  };
});

export const getAllReviewers = cache(async () => {
  return db
    .select({
      id: User.id,
      name: User.name,
      ethereumAddress: User.ethereumAddress,
      reviewsCount: countReviewsQuery.count,
      image: {
        id: Image.id,
        placeholder: Image.placeholder,
        width: Image.width,
        height: Image.height,
      },
    })
    .from(User)
    .innerJoin(Reviewer, eq(User.ethereumAddress, Reviewer.ethereumAddress))
    .leftJoin(countReviewsQuery, eq(User.id, countReviewsQuery.userId))
    .leftJoin(Image, eq(User.imageId, Image.id));
});

export const getModeratorPanelUsers = cache(async () => {
  return db
    .select({
      id: User.id,
      name: User.name,
      ethereumAddress: User.ethereumAddress,
      createdAt: User.createdAt,
      isBlocked: User.isBlocked,
      isContentHidden: User.isContentHidden,
      image: Image,
      reviewsCount: countReviewsQuery.count,
      spamCount: countCommentValuesQuery.spamCount,
      helpfulCount: countCommentValuesQuery.helpfulCount,
      submissionsCount: countApplicationsQuery.count,
    })
    .from(User)
    .leftJoin(Image, eq(Image.id, User.imageId))
    .leftJoin(countReviewsQuery, eq(User.id, countReviewsQuery.userId))
    .leftJoin(
      countCommentValuesQuery,
      eq(User.id, countCommentValuesQuery.userId),
    )
    .leftJoin(
      countApplicationsQuery,
      eq(User.id, countApplicationsQuery.userId),
    );
});

export function insertUser(data: typeof User.$inferInsert) {
  return db.insert(User).values(data).onConflictDoNothing();
}

export function upsertUser(data: typeof User.$inferInsert) {
  return db
    .insert(User)
    .values({
      id: data.id,
      name: data.name,
      imageId: data.imageId,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: User.id,
      set: {
        imageId: data.imageId,
        name: data.name,
        updatedAt: new Date(),
      },
    });
}

export interface InsertEthereumAddressData {
  addressMessageSignature: string;
  addressMessage: string;
  ethereumAddress: string;
}

export function addEthereumAddress(
  userId: UserId,
  {
    addressMessageSignature,
    ethereumAddress,
    addressMessage,
  }: InsertEthereumAddressData,
) {
  return db
    .update(User)
    .set({
      ethereumAddress,
      addressMessageSignature,
      addressMessage,
      updatedAt: new Date(),
    })
    .where(eq(User.id, userId));
}

export function removeEthereumAddress(userId: UserId) {
  return db
    .update(User)
    .set({
      ethereumAddress: null,
      addressMessageSignature: null,
      addressMessage: null,
      updatedAt: new Date(),
    })
    .where(eq(User.id, userId));
}

export interface UpdateUserBlockedFlagsData {
  userId: string;
  isBlocked: boolean;
  isContentHidden: boolean;
}

export function updateUserBlockedFlags({
  userId,
  isBlocked,
  isContentHidden,
}: UpdateUserBlockedFlagsData) {
  return db
    .update(User)
    .set({
      isBlocked,
      isContentHidden,
    })
    .where(eq(User.id, userId));
}
