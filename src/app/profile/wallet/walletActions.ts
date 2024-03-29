"use server";

import { UnauthenticatedError } from "@/constants/errors";
import {
  addEthereumAddress,
  InsertEthereumAddressData,
  removeEthereumAddress,
} from "@/drizzle/queries/user";

import { getUserId } from "@/lib/auth";

export async function addWalletAddressAction({
  addressMessageSignature,
  ethereumAddress,
  addressMessage,
}: InsertEthereumAddressData) {
  const userId = await getUserId();
  if (!userId) {
    throw new UnauthenticatedError();
  }

  await addEthereumAddress(userId, {
    addressMessageSignature,
    addressMessage,
    ethereumAddress,
  });
}

export async function removeWalletAddressAction() {
  const userId = await getUserId();
  if (!userId) {
    throw new UnauthenticatedError();
  }

  await removeEthereumAddress(userId);
}
