import { cache } from "react";
import { eq } from "drizzle-orm";

import { UserId } from "@/lib/auth";

import { db } from "../db";
import { User } from "../schema";

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

export function insertUser(data: typeof User.$inferInsert) {
  return db.insert(User).values(data).onConflictDoNothing();
}

export function updateUser(data: typeof User.$inferInsert) {
  return db
    .update(User)
    .set({
      imageId: data.imageId,
      name: data.name,
      updatedAt: new Date(),
    })
    .where(eq(User.id, data.id));
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
