import { cache } from "react";
import { countDistinct, eq } from "drizzle-orm";

import { ContentValue } from "@/types/ContentValue";
import { type UserId } from "@/types/User";

import { db } from "../db";
import {
  Application,
  CommentValue,
  Image,
  Moderator,
  Review,
  Reviewer,
  User,
} from "../schema";
import { countCommentValue } from "./comments";

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
    })
    .from(User)
    .leftJoin(Reviewer, eq(User.ethereumAddress, Reviewer.ethereumAddress))
    .leftJoin(Moderator, eq(User.ethereumAddress, Moderator.ethereumAddress))
    .where(eq(User.id, id));

  return roles;
});

export const getAllReviewers = cache(async () => {
  return db
    .select({
      id: User.id,
      name: User.name,
      ethereumAddress: User.ethereumAddress,
      image: {
        id: Image.id,
        placeholder: Image.placeholder,
        width: Image.width,
        height: Image.height,
      },
    })
    .from(User)
    .innerJoin(Reviewer, eq(User.ethereumAddress, Reviewer.ethereumAddress))
    .leftJoin(Image, eq(User.imageId, Image.id));
});

export const getModeratorPanelUsers = cache(async () => {
  return db
    .select({
      id: User.id,
      name: User.name,
      ethereumAddress: User.ethereumAddress,
      createdAt: User.createdAt,
      image: Image,
      reviewsCount: countDistinct(Review.commentId),
      spamCount: countCommentValue(ContentValue.spam),
      helpfulCount: countCommentValue(ContentValue.positive),
      submissionsCount: countDistinct(Application.id),
    })
    .from(User)
    .leftJoin(Image, eq(Image.id, User.imageId))
    .leftJoin(Review, eq(User.id, Review.userId))
    .leftJoin(CommentValue, eq(User.id, CommentValue.userId))
    .leftJoin(Application, eq(User.id, Application.userId))
    .groupBy(User.id, Image.id);
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
